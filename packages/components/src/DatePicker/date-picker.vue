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
        <div class="keyment-date-picker__header">
          <span>{{ panelLabel }}</span>
        </div>

         <div class="keyment-date-picker__week">
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
        </div>
       <div class="keyment-date-picker__dates">
        <span
          v-for="empty in startWeekDay"
          :key="`empty-${empty}`"
          class="keyment-date-picker__empty"
        />
        <button
          v-for="day in dateCells"
          :key="day"
          class="keyment-date-picker__cell"
          :class="{ 'is-selected': isSelectedDate(day) }"
          type="button"
          @click="handleSelectDate(day)"
        >
          {{ day }}
        </button>
      </div>
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


// 日期面板
const panelDate = ref(new Date());

// 当前月份第一天
// 这个值拿来算日历面板第一天是星期几，从而决定从哪个格子开始画
const firstDay = computed(() => {
  // getFullYear() 获得年 getMonth（）获得月 	0~11
  return new Date(panelDate.value.getFullYear(), panelDate.value.getMonth(), 1);
});

const startWeekDay = computed(() => {
  return firstDay.value.getDay();
});

// 当前月份总共有多少天
const daysInMonth = computed(() => {
  // 下个月的第 0 天，js自动转换成上个月最后一天。getDate()得到几号 就得到当前月份有几天
  return new Date(
    panelDate.value.getFullYear(),
    panelDate.value.getMonth() + 1,
    0
  ).getDate();
});

// 日期数组
const dateCells = computed(() => {
  const days = [];

  for (let day = 1; day <= daysInMonth.value; day++) {
    days.push(day);
  }

  return days;
});

// 选择日期的函数
const handleSelectDate = (day: number) => {
  const selectedDate = new Date(
    panelDate.value.getFullYear(),
    panelDate.value.getMonth(),
    day
  );

  emit("update:modelValue", selectedDate);
  emit("change", selectedDate);

  panelVisible.value = false;
};

// 判断日历面板上某个格子是不是当前选中的日期，用于高亮那个格子
const isSelectedDate = (day: number) => {
  if (!props.modelValue) {
    return false;
  }

  // getFullYear()、.getMonth()、.getDate() 这些方法，只有 Date 对象才有
  const value =
    props.modelValue instanceof Date
      ? props.modelValue
      : new Date(props.modelValue);

  return (
    value.getFullYear() === panelDate.value.getFullYear() &&
    value.getMonth() === panelDate.value.getMonth() &&
    value.getDate() === day
  );
};

const panelLabel = computed(() => {
  const year = panelDate.value.getFullYear();
  const month = panelDate.value.getMonth() + 1;

  return `${year} 年 ${month} 月`;
});

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
  width: 280px;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  color: #606266;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}
.keyment-date-picker__cell {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #606266;
  cursor: pointer;
}

.keyment-date-picker__cell:hover {
  color: #409eff;
}

.keyment-date-picker__cell.is-selected {
  background: #409eff;
  color: #ffffff;
}

.keyment-date-picker__week,
.keyment-date-picker__dates {
  display: grid;
  grid-template-columns: repeat(7, 32px);
  gap: 6px;
}

.keyment-date-picker__week {
  margin-bottom: 8px;
  color: #909399;
  font-size: 12px;
  text-align: center;
}

.keyment-date-picker__empty {
  width: 32px;
  height: 32px;
}
.keyment-date-picker__header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin-bottom: 8px;
  color: #303133;
  font-size: 14px;
  font-weight: 500;
}
</style>