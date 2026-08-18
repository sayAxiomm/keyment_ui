<template>
  <!-- 
    label 是整个 Checkbox 的可点击区域。
    点击文字也能切换 checkbox。
  -->
  <label class="keyment-checkbox" :class="checkboxClass">
    <!-- 
      原生 checkbox。
      真正负责表单语义的是它。
      视觉样式后面用 span 自己画。
    -->
    <input
      class="keyment-checkbox__original"
      type="checkbox"
      :name="actualName"
      :checked="isChecked"
      :disabled="actualDisabled"
      @change="handleChange"
    />

    <!-- 自定义 checkbox 外观 -->
    <span class="keyment-checkbox__input">
      <span class="keyment-checkbox__inner"></span>
    </span>

    <!-- 默认插槽，显示文字 -->
    <span class="keyment-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, nextTick } from "vue";
import type { CheckboxEmits, CheckboxProps, CheckboxGroupContext } from "./checkbox";
import type { FormItemContext } from "../Form/form";

defineOptions({
  name: "KyCheckbox"
});

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  border: false,
  size: "default",
  trueValue: true,
  falseValue: false,
  indeterminate: false,
  validateEvent: true
});

const emit = defineEmits<CheckboxEmits>();
const checkboxGroup = inject<CheckboxGroupContext>("checkboxGroup");
const formItem = inject<FormItemContext>("formItem");
const isGroup = computed(() => !!checkboxGroup); // 判断checkbox是否在group里面,!! 转布尔
// 判断是否选中
const isChecked = computed(() => {
  if (isGroup.value) {
    return checkboxGroup?.modelValue?.includes(props.value!) ?? false;
  }

  return props.modelValue === props.trueValue;
});
// 根据 CheckboxGroup 的 min/max 限制，判断当前 checkbox 是否需要临时禁用。
const isLimitDisabled = computed(() => {
  if (!isGroup.value) {
    return false;
  }

  const modelValue = checkboxGroup?.modelValue ?? [];

  // 已经选中的项，如果当前数量已经等于 min，就不允许取消
  if (isChecked.value) {
    return checkboxGroup?.min !== undefined && modelValue.length <= checkboxGroup.min;
  }

  // 没选中的项，如果当前数量已经等于 max，就不允许继续选
  return checkboxGroup?.max !== undefined && modelValue.length >= checkboxGroup.max;
});

// 单独使用：用 props.xxx
// 放在 group 里：优先用 checkboxGroup.xxx
const actualDisabled = computed(() => {
  return checkboxGroup?.disabled || props.disabled || isLimitDisabled.value;
});
const actualName = computed(() => {
  return checkboxGroup?.name || props.name;
});
const actualBorder = computed(() => {
  return checkboxGroup?.border || props.border;
});

const actualSize = computed(() => {
  return checkboxGroup?.size || props.size;
});
const checkboxClass = computed(() => [
  `keyment-checkbox--${actualSize.value}`,
  {
    "is-checked": isChecked.value,
    "is-disabled": actualDisabled.value,
    "is-bordered": actualBorder.value,
    "is-indeterminate": props.indeterminate
  }
]);
const handleChange = () => {
  if (actualDisabled.value) {
    return;
  }
  // 如果在 group 里：用 props.value 通知 group,group 负责更新数组
  // 如果不在 group 里：自己在 trueValue / falseValue 之间切换
  if (isGroup.value) {
    if (props.value === undefined) {
      return;
    }

    checkboxGroup?.changeEvent(props.value);
    return;
  }
  // 如果当前是选中
  //   点击后变成 falseValue
  // 如果当前没选中
  //   点击后变成 trueValue
  const nextValue = isChecked.value ? props.falseValue : props.trueValue;

  emit("update:modelValue", nextValue);
  emit("change", nextValue);

  if (props.validateEvent) {
    nextTick(() => {
      formItem?.validate("change");
    });
  }
};
</script>
<style scoped>
.keyment-checkbox {
  display: inline-flex;
  align-items: center;
  margin-right: 24px;
  color: #606266;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  user-select: none;
}

.keyment-checkbox__original {
  position: absolute;
  opacity: 0;
  outline: none;
  z-index: -1;
}

.keyment-checkbox__input {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  box-sizing: border-box;
  background: #ffffff;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.keyment-checkbox__inner {
  width: 7px;
  height: 4px;
  border-left: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  transform: rotate(-45deg) scale(0);
  transition: transform 0.15s ease;
}

.keyment-checkbox__label {
  padding-left: 8px;
}

.keyment-checkbox.is-checked {
  color: #409eff;
}

.keyment-checkbox.is-checked .keyment-checkbox__input {
  border-color: #409eff;
  background: #409eff;
}

.keyment-checkbox.is-checked .keyment-checkbox__inner {
  transform: rotate(-45deg) scale(1);
}

.keyment-checkbox.is-indeterminate .keyment-checkbox__input {
  border-color: #409eff;
  background: #409eff;
}

.keyment-checkbox.is-indeterminate .keyment-checkbox__inner {
  width: 8px;
  height: 2px;
  border: none;
  background: #ffffff;
  transform: scale(1);
}

.keyment-checkbox.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.keyment-checkbox.is-disabled .keyment-checkbox__input {
  border-color: #e4e7ed;
  background: #f5f7fa;
}

.keyment-checkbox.is-disabled .keyment-checkbox__inner {
  border-color: #c0c4cc;
}

.keyment-checkbox.is-bordered {
  height: 32px;
  padding: 0 15px 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
}

.keyment-checkbox.is-bordered.is-checked {
  border-color: #409eff;
}

.keyment-checkbox--small.is-bordered {
  height: 28px;
  padding: 0 12px 0 10px;
  font-size: 12px;
}

.keyment-checkbox--large.is-bordered {
  height: 40px;
  padding: 0 18px 0 14px;
  font-size: 16px;
}
</style>
