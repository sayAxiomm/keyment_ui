<template>
  <!-- 
    Switch 本质是一个二选一控件。
    外层用 label，这样点击整个开关区域都能触发内部 input。
  -->
  <label class="keyment-switch" :class="switchClass">
     <!-- 关闭状态文字 -->
    <span
      v-if="(props.inactiveIcon ||props.inactiveText )&& !props.inlinePrompt"
      class="keyment-switch__label"
      :class="{ 'is-active': !isChecked }"
    >
       <component
        v-if="props.inactiveIcon"
        :is="props.inactiveIcon"
        class="keyment-switch__label-icon"
      />
    <!-- 当 !isChecked 为 true 时，给这个元素加 is-active class
    当 !isChecked 为 false 时，不加 is-active class -->
      <template v-else>
        {{ props.inactiveText }}
      </template>
    </span>
     
    <!-- 
      原生 checkbox 负责真实的选中/取消行为。
      视觉上会隐藏它，自己用 span 画开关。
    -->
    <input
      class="keyment-switch__original"
      type="checkbox"
      :id="props.id"
      :name="props.name"
      :checked="isChecked"
      :disabled="props.disabled || props.loading"
      @change="handleChange"
    />
    <!-- 外层 span：轨道，内层 span：圆点 -->
    <span class="keyment-switch__core" :style="coreStyle">
      <component
        v-if="props.inlinePrompt && currentInnerIcon"
        :is="currentInnerIcon"
        class="keyment-switch__inner-icon"
        :class="{ 'is-checked': isChecked }"
      />
      <!-- 打开时：文字靠左，圆点在右,默认是right
           关闭时：文字靠右，圆点在左 -->
      <span
        v-else-if="props.inlinePrompt"
        class="keyment-switch__inner-text"
        :class="{ 'is-checked': isChecked }"
      >
        {{ isChecked ? props.activeText : props.inactiveText }}
      </span>
      <!-- style这里left要根据width动态计算 -->
      <span class="keyment-switch__action" :style="actionStyle">
        <!-- :is 传什么组件，就渲染什么组件 -->
        <component
          v-if="currentActionIcon"
          :is="currentActionIcon"
          class="keyment-switch__action-icon"
        />
      </span>
    </span>

    <!-- 打开状态文字 -->
    <span
      v-if="(props.activeIcon || props.activeText) && !props.inlinePrompt"
      class="keyment-switch__label"
      :class="{ 'is-active': isChecked }"
    >
       <component
        v-if="props.activeIcon"
        :is="props.activeIcon"
        class="keyment-switch__label-icon"
      />
      <template v-else>
        {{ props.activeText }}
      </template>
    </span>

  </label>
</template>

<script setup lang="ts">
import { computed, inject, nextTick } from "vue";
import type { SwitchProps, SwitchEmits } from "./switch";
import type { FormItemContext } from "../Form/form";

defineOptions({
  name: "KySwitch"
});

const props = withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
  loading: false,
  activeValue: true,
  inactiveValue: false,
  validateEvent: true,
  inlinePrompt: false,
  size: "default"
});

const emit = defineEmits<SwitchEmits>();
const formItem = inject<FormItemContext>("formItem");
const switchClass = computed(() => ({
  "is-checked": isChecked.value,
  "is-disabled": props.disabled,
  "is-loading": props.loading,
  [`keyment-switch--${props.size}`]: props.size
}));

// 当前是否处于打开状态。
// modelValue 等于 activeValue，就表示打开。
const isChecked = computed(() => {
  return props.modelValue === props.activeValue;
});

const handleChange = () => {
  if (props.disabled || props.loading) {
    return;
  }

  const nextValue = isChecked.value ? props.inactiveValue : props.activeValue;

  emit("update:modelValue", nextValue);
  emit("change", nextValue);

  if (props.validateEvent) {
    nextTick(() => {
      formItem?.validate("change");
    });
  }
};

// Switch 轨道用的动态行内样式,把 coreStyle 这个对象里的样式，动态加到轨道上
const coreStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.width !== undefined) {
    style.width = `${props.width}px`;
  }

  if (isChecked.value && props.activeColor) {
    style.backgroundColor = props.activeColor;
  }

  if (!isChecked.value && props.inactiveColor) {
    style.backgroundColor = props.inactiveColor;
  }

  return style;
});


// 根据按钮的长度动态计算圆点位移距离
// 圆圈大小和滑轨也要根据size变化
const actionSizeMap = {
  small: 12,
  default: 16,
  large: 20
};

const defaultWidthMap = {
  small: 32,
  default: 40,
  large: 48
};
const actionStyle = computed(() => {
  if (!isChecked.value) {
    return {};
  }
  const currentSize = props.size ?? "default";
  const switchWidth = props.width ?? defaultWidthMap[currentSize];// ??和||区别是 ??的时候可以取0
  const actionSize = actionSizeMap[currentSize];
  const offset = 2;

  return {
    left: `${switchWidth - actionSize - offset}px`
  };
});

// 圆点里面的icon
const currentActionIcon = computed(() => {
  return isChecked.value ? props.activeActionIcon : props.inactiveActionIcon;
});

// 轨道图标
const currentInnerIcon = computed(() => {
  return isChecked.value ? props.activeIcon : props.inactiveIcon;
});
</script>
<style scoped>
.keyment-switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.keyment-switch__original {
  position: absolute;
  opacity: 0;
  outline: none;
  z-index: -1;
}

.keyment-switch__core {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 40px;
  height: 20px;
  border-radius: 999px;
  background: #dcdfe6;
  box-sizing: border-box;
  /* 背景色变化时，用 0.2 秒平滑过渡，不要瞬间跳变。 */
  transition: background-color 0.2s;
}
.keyment-switch.is-checked .keyment-switch__core {
  background: #409eff;
}
.keyment-switch__action {
  position: absolute;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  transition: left 0.25s;
}
.keyment-switch--small .keyment-switch__core {
  width: 32px;
  height: 16px;
}

.keyment-switch--small .keyment-switch__action {
  width: 12px;
  height: 12px;
}

.keyment-switch--large .keyment-switch__core {
  width: 48px;
  height: 24px;
}

.keyment-switch--large .keyment-switch__action {
  width: 20px;
  height: 20px;
}
.keyment-switch.is-disabled,
.keyment-switch.is-loading {
  cursor: not-allowed;
  opacity: 0.6;
}
.keyment-switch__label {
  margin: 0 8px;
  color: #606266;
  font-size: 14px;
}

.keyment-switch__label.is-active {
  color: #409eff;
}
.keyment-switch__inner-text {
  position: absolute;
  right: 6px;
  color: #ffffff;
  font-size: 12px;
  line-height: 1;
  pointer-events: none;
}
.keyment-switch__inner-text.is-checked {
  left: 6px;
  right: auto;
}
.keyment-switch__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.keyment-switch__action-icon {
  width: 12px;
  height: 12px;
  color: #909399;
}
.keyment-switch.is-checked .keyment-switch__action-icon {
  color: #409eff;
}
.keyment-switch__inner-icon {
  position: absolute;
  right: 6px;
  width: 12px;
  height: 12px;
  color: #ffffff;
  pointer-events: none;
}

.keyment-switch__inner-icon.is-checked {
  left: 6px;
  right: auto;
}
.keyment-switch__label-icon {
  width: 14px;
  height: 14px;
}
.keyment-switch__label.is-active {
  color: #409eff;
}
</style>
