<template>
  <!-- 
    CheckboxButton 是按钮形式的 Checkbox。
    整个 label 都是可点击区域。
  -->
  <label class="keyment-checkbox-button" :class="checkboxButtonClass">
    <!-- 
      原生 checkbox 仍然保留，用于表单语义。
      视觉上隐藏。
    -->
    <input
      class="keyment-checkbox-button__original"
      type="checkbox"
      :name="actualName"
      :checked="isChecked"
      :disabled="actualDisabled"
      @change="handleChange"
    />

    <!-- 按钮主体 -->
    <span class="keyment-checkbox-button__inner" :style="activeStyle">
      <slot />
    </span>
  </label>
</template>
<script setup lang="ts">
import { computed, inject } from "vue";
import type {
  CheckboxEmits,
  CheckboxGroupContext,
  CheckboxProps
} from "./checkbox";

defineOptions({
  name: "KyCheckboxButton"
});

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  trueValue: true,
  falseValue: false,
  validateEvent: true
});

const emit = defineEmits<CheckboxEmits>();

const checkboxGroup = inject<CheckboxGroupContext>("checkboxGroup");

const isGroup = computed(() => !!checkboxGroup);

const isChecked = computed(() => {
  if (isGroup.value) {
    return checkboxGroup?.modelValue?.includes(props.value!) ?? false;
  }

  return props.modelValue === props.trueValue;
});

const isLimitDisabled = computed(() => {
  if (!isGroup.value) {
    return false;
  }

  const modelValue = checkboxGroup?.modelValue ?? [];

  if (isChecked.value) {
    return checkboxGroup?.min !== undefined && modelValue.length <= checkboxGroup.min;
  }

  return checkboxGroup?.max !== undefined && modelValue.length >= checkboxGroup.max;
});

const actualDisabled = computed(() => {
  return checkboxGroup?.disabled || props.disabled || isLimitDisabled.value;
});

const actualName = computed(() => {
  return checkboxGroup?.name || props.name;
});

const actualSize = computed(() => {
  return checkboxGroup?.size || props.size || "default";
});

const activeStyle = computed(() => {
  if (!isChecked.value) {
    return {};
  }

  return {
    color: checkboxGroup?.textColor || "#ffffff",
    backgroundColor: checkboxGroup?.fill || "#409eff",
    borderColor: checkboxGroup?.fill || "#409eff"
  };
});

const checkboxButtonClass = computed(() => [
  `keyment-checkbox-button--${actualSize.value}`,
  {
    "is-checked": isChecked.value,
    "is-disabled": actualDisabled.value
  }
]);

const handleChange = () => {
  if (actualDisabled.value) {
    return;
  }

  if (isGroup.value) {
    if (props.value === undefined) {
      return;
    }

    checkboxGroup?.changeEvent(props.value);
    return;
  }

  const nextValue = isChecked.value ? props.falseValue : props.trueValue;

  emit("update:modelValue", nextValue);
  emit("change", nextValue);
};
</script>

<style scoped>
.keyment-checkbox-button {
  position: relative;
  display: inline-flex;
  cursor: pointer;
  user-select: none;
}

.keyment-checkbox-button__original {
  position: absolute;
  opacity: 0;
  outline: none;
  z-index: -1;
}

.keyment-checkbox-button__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 15px;
  color: #606266;
  font-size: 14px;
  line-height: 1;
  border: 1px solid #dcdfe6;
  background: #ffffff;
  box-sizing: border-box;
  transition: color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
}

.keyment-checkbox-button + .keyment-checkbox-button .keyment-checkbox-button__inner {
  margin-left: -1px;
}

.keyment-checkbox-button:first-child .keyment-checkbox-button__inner {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.keyment-checkbox-button:last-child .keyment-checkbox-button__inner {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.keyment-checkbox-button.is-checked .keyment-checkbox-button__inner {
  color: #ffffff;
  border-color: #409eff;
  background: #409eff;
}

.keyment-checkbox-button.is-disabled {
  cursor: not-allowed;
}

.keyment-checkbox-button.is-disabled .keyment-checkbox-button__inner {
  color: #c0c4cc;
  border-color: #e4e7ed;
  background: #f5f7fa;
}

.keyment-checkbox-button--small .keyment-checkbox-button__inner {
  height: 28px;
  padding: 0 12px;
  font-size: 12px;
}

.keyment-checkbox-button--large .keyment-checkbox-button__inner {
  height: 40px;
  padding: 0 18px;
  font-size: 16px;
}
</style>
