<template>
  <!-- 
    RadioButton 外层仍然用 label。
    这样点击文字区域也能触发内部 input。
  -->
  <label class="keyment-radio-button" :class="radioButtonClass">
    <!-- 
      真正负责选中行为的仍然是原生 radio input。
      只是它会被隐藏，视觉效果由下面的 span 绘制。
    -->
    <input
      class="keyment-radio-button__original"
      type="radio"
      :name="actualName"
      :value="props.value"
      :checked="isChecked"
      :disabled="actualDisabled"
      @change="handleChange"
    />

    <!-- 按钮外观 -->
    <span class="keyment-radio-button__inner" :style="innerStyle">
      <slot>{{ props.value }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import type {
  RadioButtonProps,
  RadioEmits,
  RadioGroupContext
} from "./radio";

defineOptions({
  name: "KyRadioButton"
});

const props = withDefaults(defineProps<RadioButtonProps>(), {
  disabled: false,
  size: "default"
});

const emit = defineEmits<RadioEmits>();

// 尝试从 RadioGroup 拿上下文。
// 如果拿到了，说明当前 RadioButton 在 KyRadioGroup 里面。
const radioGroup = inject<RadioGroupContext>("radioGroup") || undefined;

const isGroup = computed(() => !!radioGroup);

// 当前使用的 modelValue：
// 在 group 里，用 group 的 modelValue。
// 单独使用时，用自己 props.modelValue。
const actualModelValue = computed(() => {
  return isGroup.value ? radioGroup?.modelValue : props.modelValue;
});

const actualDisabled = computed(() => {
  return radioGroup?.disabled || props.disabled;
});

const actualSize = computed(() => {
  return radioGroup?.size || props.size;
});

const actualName = computed(() => {
  return radioGroup?.name || props.name;
});
const actualTextColor = computed(() => {
  return radioGroup?.textColor || "#ffffff";
});

const actualFill = computed(() => {
  return radioGroup?.fill || "#409eff";
});

// 是否选中：当前选中值 === 当前按钮自己的 value。
const isChecked = computed(() => actualModelValue.value === props.value);

// 行内样式, 一般值是无限的就适合写行内style
const innerStyle = computed(() => {
  if (!isChecked.value) {
    return {};
  }

  return {
    color: actualTextColor.value,
    backgroundColor: actualFill.value,
    borderColor: actualFill.value
  };
});

const radioButtonClass = computed(() => [
  `keyment-radio-button--${actualSize.value}`,
  {
    "is-checked": isChecked.value,
    "is-disabled": actualDisabled.value
  }
]);

const handleChange = () => {
  if (actualDisabled.value) {
    return;
  }

  // 在 group 里，把新值交给 group 统一处理。
  if (isGroup.value) {
    radioGroup?.changeEvent(props.value);
    return;
  }

  // 单独使用时，自己向外触发 v-model 更新和 change。
  emit("update:modelValue", props.value);
  emit("change", props.value);
};
</script>

<style scoped>
.keyment-radio-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.keyment-radio-button__original {
  position: absolute;
  opacity: 0;
  outline: none;
  z-index: -1;
}

.keyment-radio-button__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 15px;
  border: 1px solid #dcdfe6;
  border-left: 0;
  background: #ffffff;
  color: #606266;
  font-size: 14px;
  line-height: 1;
  box-sizing: border-box;
}

.keyment-radio-button:first-child .keyment-radio-button__inner {
  border-left: 1px solid #dcdfe6;
  border-radius: 4px 0 0 4px;
}

.keyment-radio-button:last-child .keyment-radio-button__inner {
  border-radius: 0 4px 4px 0;
}

.keyment-radio-button.is-checked .keyment-radio-button__inner {
  color: #ffffff;
  border-color: #409eff;
  background: #409eff;
}

.keyment-radio-button.is-disabled {
  cursor: not-allowed;
}

.keyment-radio-button.is-disabled .keyment-radio-button__inner {
  color: #c0c4cc;
  background: #f5f7fa;
  border-color: #e4e7ed;
}

.keyment-radio-button--small .keyment-radio-button__inner {
  height: 28px;
  padding: 0 12px;
  font-size: 12px;
}

.keyment-radio-button--large .keyment-radio-button__inner {
  height: 40px;
  padding: 0 18px;
  font-size: 16px;
}
</style>
