<template>
  <div class="keyment-date-picker">
    <!-- 输入框区域：点击后打开日期面板 -->
    <div class="keyment-date-picker__wrapper">
      <input
        class="keyment-date-picker__inner"
        type="text"
        :value="displayValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="true"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="handleOpen"
      />

      <!-- 清空按钮：有值、可清空、非禁用时显示 -->
      <button
        v-if="showClear"
        class="keyment-date-picker__clear"
        type="button"
        @click.stop="handleClear"
      >
        x
      </button>
    </div>

    <!-- 日期面板：第一版先只做外壳 -->
    <div
      v-if="panelVisible"
      class="keyment-date-picker__panel"
    >
      日期面板
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { DatePickerEmits, DatePickerProps } from "./date-picker";

defineOptions({
  name: "KyDatePicker"
});

const props = withDefaults(defineProps<DatePickerProps>(), {
  disabled: false,
  readonly: false,
  clearable: false,
  format: "YYYY-MM-DD"
});

const emit = defineEmits<DatePickerEmits>();

// 日期面板是否显示。
const panelVisible = ref(false);

// 输入框中显示的值。
// 第一版先直接把 modelValue 转成字符串显示，后面再做真正的日期格式化。
const displayValue = computed(() => {
  if (!props.modelValue) {
    return "";
  }

  if (props.modelValue instanceof Date) {
    return props.modelValue.toLocaleDateString();
  }

  return props.modelValue;
});

// 是否显示清空按钮。
const showClear = computed(() => {
  return props.clearable && !props.disabled && !!props.modelValue;
});

// 打开日期面板。
const handleOpen = () => {
  if (props.disabled || props.readonly) {
    return;
  }

  panelVisible.value = true;
};

// 输入框获得焦点。
const handleFocus = (event: FocusEvent) => {
  emit("focus", event);
};

// 输入框失去焦点。
const handleBlur = (event: FocusEvent) => {
  emit("blur", event);
};

// 清空当前日期。
const handleClear = () => {
  emit("update:modelValue", undefined);
  emit("change", undefined);
  emit("clear");
};
</script>
<style scoped>
.keyment-date-picker {
  position: relative;
  display: inline-block;
  width: 240px;
}

.keyment-date-picker__wrapper {
  position: relative;
}

.keyment-date-picker__inner {
  width: 100%;
  height: 32px;
  padding: 0 32px 0 11px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  color: #606266;
  font-size: 14px;
  line-height: 32px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}

.keyment-date-picker__inner:focus {
  border-color: #409eff;
}

.keyment-date-picker__inner:disabled {
  color: #a8abb2;
  background: #f5f7fa;
  cursor: not-allowed;
}

.keyment-date-picker__clear {
  position: absolute;
  top: 50%;
  right: 8px;
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
  transform: translateY(-50%);
}

.keyment-date-picker__clear:hover {
  background: #909399;
}

.keyment-date-picker__panel {
  position: absolute;
  /* calc()	CSS 计算函数，允许不同单位混合运算 */
  top: calc(100% + 8px);
  left: 0;
  z-index: 1000;
  height: 280px;
  width: 280px;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  color: #606266;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}
</style>