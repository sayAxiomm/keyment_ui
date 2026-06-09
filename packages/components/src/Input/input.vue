<template>
  <div class="keyment-input" :class="inputClass">

     <!-- 前置图标：放在 input/textarea 前面 -->
    <component
      v-if="props.prefixIcon"
      :is="props.prefixIcon"
      class="keyment-input__prefix-icon"
    />
    <!-- textarea：多行输入 -->
    <!-- 因为原生 HTML 里没有：<input type="textarea" /> -->
    <textarea
      v-if="props.type === 'textarea'"
      class="keyment-input__inner keyment-input__textarea"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :name="props.name"
      :id="props.id"
      :maxlength="props.maxlength"
      :minlength="props.minlength"
      :rows="props.rows"
      :autofocus="props.autofocus"
      :tabindex="props.tabindex"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- input：普通输入 / 密码输入 -->
    <input
      v-else
      class="keyment-input__inner"
      :value="props.modelValue"
      :type="actualType"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :name="props.name"
      :id="props.id"
      :maxlength="props.maxlength"
      :minlength="props.minlength"
      :style="textareaStyle"
      :autocomplete="props.autocomplete"
      :autofocus="props.autofocus"
      :tabindex="props.tabindex"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span
      v-if="hasSuffixArea"
      class="keyment-input__suffix"
    >
      <!-- 后置图标：放在 input/textarea 后面 -->
      <component
        v-if="props.suffixIcon"
        :is="props.suffixIcon"
        class="keyment-input__suffix-icon"
      />

      <!-- 字数统计模块 -->
      <span v-if="showWordLimit" class="keyment-input__count">
        {{ textLength }} / {{ props.maxlength }}
      </span>

      <!-- 清除按钮 -->
      <button
        v-if="showClear"
        class="keyment-input__clear"
        type="button"
        @click="handleClear"
      >
        x
      </button>

      <!-- 密码显隐按钮 -->
      <button
        v-if="showPasswordToggle"
        class="keyment-input__password"
        type="button"
        @click="handlePasswordToggle"
      >
        <component
        :is="passwordVisible ? View : Hide"
        class="keyment-input__password-icon"
        />
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, ref } from "vue";
import { View, Hide } from "@keyment/icons";
import type { InputEmits, InputProps } from "./input";
import type { FormItemContext } from "../Form/form";

defineOptions({
  name: "KyInput"
});

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  disabled: false,
  readonly: false,
  size: "default",
  validateEvent: true,
  resize: "vertical"
});


// 动态添加样式 
const inputClass = computed(() => ([
  `keyment-input--${props.size}`,
  //这个是控制清除和隐藏的按钮位置
  {
  "has-clear": showClear.value,
  "has-password": showPasswordToggle.value,
  "has-prefix": !!props.prefixIcon,
  "has-suffix": !!props.suffixIcon,
  "has-word-limit": showWordLimit.value,
  "has-suffix-area": hasSuffixArea.value
  }
]));
const emit = defineEmits<InputEmits>();
const formItem = inject<FormItemContext>("formItem", undefined);

const validateFormItem = (trigger: "blur" | "change") => {
  if (!props.validateEvent) {
    return;
  }

  nextTick(() => {
    formItem?.validate(trigger);
  });
};

// 子传父的事件
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  emit("update:modelValue", target.value);
  emit("input", target.value);
  validateFormItem("change");
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  emit("change", target.value);
};

const handleFocus = (event: FocusEvent) => {
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  emit("blur", event);
  validateFormItem("blur");
};
// 清空的事件
const handleClear = () => {
  emit("update:modelValue", "");
  emit("input", "");
  emit("clear");
  validateFormItem("change");
};

// 是否显示清空按钮
const showClear = computed(() => {
  return (
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    !!props.modelValue
  );
});

        // 初始 passwordVisible = false
        // -> actualType = "password"
        // -> 输入内容不可见

        // 点击显隐按钮
        // -> handlePasswordToggle 执行
        // -> passwordVisible = true
        // -> actualType 重新计算成 "text"
        // -> input type 变成 text
        // -> 密码显示出来

        // 再次点击
        // -> passwordVisible = false
        // -> actualType 变回 password
        // -> 密码隐藏

// 表示当前密码是否可见
const passwordVisible = ref(false);
// 根据密码是否可见返回type，这个是决定了input的type
const actualType = computed(() => {
  if (props.type !== "password") {
    return props.type;
  }
  return passwordVisible.value ? "text" : "password";
});
// 显示密码按钮显示的条件,不依赖其他三个部分
const showPasswordToggle = computed(() => {
  return (
    props.showPassword &&
    props.type === "password" &&
    !props.disabled &&
    !props.readonly&&
    !!props.modelValue
  );
});
// 切换密码是否可见, button绑定的函数
const handlePasswordToggle = () => {
  passwordVisible.value = !passwordVisible.value;
};


// 字数统计
const showWordLimit = computed(() => {
  return (
    props.showWordLimit &&
    props.maxlength !== undefined &&
    props.type !== "password"
  );
});
// 当前字数
const textLength = computed(() => {
  return props.modelValue?.length ?? 0;
});

// 是否需要右侧功能区。
// 只要有后置图标、字数统计、清空按钮、密码显隐按钮，就显示 suffix 容器。
const hasSuffixArea = computed(() => {
  return (
    !!props.suffixIcon ||
    showWordLimit.value ||
    showClear.value ||
    showPasswordToggle.value
  );
});

//  textarea 动态样式：
const textareaStyle = computed(() => {
  if (props.type !== "textarea") {
    return {};
  }

  return {
    resize: props.resize
  };
});
</script>


<style scoped>
.keyment-input {
  position: relative;
  display: inline-flex;
  width: 100%;
}

.keyment-input__inner {
  width: 100%;
  height: 32px;
  padding: 0 11px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  color: #606266;
  font-size: 14px;
  line-height: 32px;
  outline: none;
  transition: border-color 0.2s;
}

.keyment-input__inner::placeholder {
  color: #a8abb2;
}

.keyment-input__inner:focus {
  border-color: #409eff;
}

.keyment-input__inner:disabled {
  color: #a8abb2;
  background: #f5f7fa;
  cursor: not-allowed;
}

.keyment-input__textarea {
  min-height: 72px;
  padding: 6px 11px;
  line-height: 1.5;
  /* resize控制元素是否可以被用户拖拽缩放 */
  /* vertical 只能上下拖拽改变高度*/
}

.keyment-input__suffix {
  position: absolute;
  top: 50%;
  right: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #909399;
  transform: translateY(-50%);
}

.keyment-input__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #c0c4cc;
  color: #ffffff;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
}

.keyment-input__clear:hover {
  background: #909399;
}
.keyment-input__password {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: #909399;
  font-size: 12px;
  cursor: pointer;
}

.keyment-input__password:hover {
  color: #606266;
}
.keyment-input--small .keyment-input__inner {
  height: 28px;
  line-height: 28px;
  font-size: 12px;
}

.keyment-input--large .keyment-input__inner {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.keyment-input--small .keyment-input__textarea {
  min-height: 64px;
  line-height: 1.5;
}

.keyment-input--large .keyment-input__textarea {
  min-height: 88px;
  line-height: 1.5;
}
.keyment-input__prefix-icon {
  position: absolute;
  top: 50%;
  left: 8px;
  width: 1em;
  height: 1em;
  color: #a8abb2;
  transform: translateY(-50%);
  pointer-events: none;
}

.keyment-input__suffix-icon {
  width: 1em;
  height: 1em;
  color: #a8abb2;
  pointer-events: none;
}
.keyment-input.has-prefix .keyment-input__inner {
  padding-left: 28px;
}

.keyment-input__count {
  color: #909399;
  font-size: 12px;
  line-height: 1;
  pointer-events: none;
  white-space: nowrap;
}

.keyment-input.has-suffix-area .keyment-input__inner {
  padding-right: 96px;
}
.keyment-input__password-icon {
  width: 1em;
  height: 1em;
}
</style>
