<template>
  <div
    class="keyment-option"
    :class="{
      'is-disabled': props.disabled,
      'is-selected': isSelected
    }"
    @click="handleClick"
    >
    {{ optionLabel }}
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import type { OptionProps,SelectContext } from "./select";

defineOptions({
  name: "KyOption"
});

const props = withDefaults(defineProps<OptionProps>(), {
  disabled: false
});
const select = inject<SelectContext>("select");

// option 显示给用户看的文字。
const optionLabel = computed(() => {
  return props.label ?? String(props.value);
});

// 当前 option 是否是选中项。
const isSelected = computed(() => {
  if (select?.multiple && Array.isArray(select.modelValue)) {
    return select.modelValue.includes(props.value);
  }

  return select?.modelValue === props.value;
});

// 点击 option 时，通知 select 选中了当前选项。
const handleClick = () => {
  if (props.disabled) {
    return;
  }

  select?.selectOption({
    value: props.value,
    label: optionLabel.value,
    disabled: props.disabled
  });
};
</script>

<style scoped>
.keyment-option {
  height: 32px;
  padding: 0 12px;
  color: #606266;
  font-size: 14px;
  line-height: 32px;
  cursor: pointer;
}

.keyment-option:hover {
  background: #f5f7fa;
  color: #409eff;
}

.keyment-option.is-selected {
  color: #409eff;
  font-weight: 600;
}

.keyment-option.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.keyment-option.is-disabled:hover {
  background: transparent;
  color: #c0c4cc;
}
</style>
