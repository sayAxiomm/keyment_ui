<template>
  <div class="keyment-date-picker" ref="datePickerRef"
  @mouseenter="isHovering = true"
  @mouseleave="isHovering = false"
  :class="datePickerClass"
  >
    <!-- 输入框区域：点击后打开日期面板 -->
    <div class="keyment-date-picker__wrapper">
      <input
        v-if="!isRange"
        class="keyment-date-picker__inner"
        type="text"
        :value="displayValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="!props.editable || props.readonly"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="handleOpen"
      />
      <div
        v-else
        class="keyment-date-picker__range"
        @click="handleOpen"
      >
        <input
          class="keyment-date-picker__range-input"
          type="text"
          :value="rangeStartText"
          :placeholder="props.startPlaceholder"
          :disabled="props.disabled"
          :readonly="true"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <span class="keyment-date-picker__range-separator">
          {{ props.rangeSeparator }}
        </span>

        <input
          class="keyment-date-picker__range-input"
          type="text"
          :value="rangeEndText"
          :placeholder="props.endPlaceholder"
          :disabled="props.disabled"
          :readonly="true"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <span
        class="keyment-date-picker__icon"
      >
        <Calendar />
      </span>
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
       @click.stop
    >   
        <div class="keyment-date-picker__header">
          <button
            class="keyment-date-picker__header-btn"
            type="button"
            @click="handlePrevYear"
          >
            <<
          </button>
          <button
          v-if="props.type == 'date'"
            class="keyment-date-picker__header-btn"
            type="button"
            @click="handlePrevMonth"
          >
              <
          </button>

         <div class="keyment-date-picker__header-labels">
          <button
            class="keyment-date-picker__header-label"
            type="button"
            @click="panelMode = 'year'"
          >
            {{ panelYear }} 年
           </button>

          <button
            v-if="props.type == 'date'"
            class="keyment-date-picker__header-label"
            type="button"
            @click="panelMode = 'month'"
          >
            {{ panelMonth }} 月
          </button>
        </div>

        <button
        v-if="props.type == 'date'"
          class="keyment-date-picker__header-btn"
          type="button"
          @click="handleNextMonth"
        >
          >
        </button>
        <button
          class="keyment-date-picker__header-btn"
          type="button"
          @click="handleNextYear"
        >
          >>
        </button>

        </div>
        
        <template v-if="panelMode === 'date'">
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
          <button
            v-for="cell in dateCells"
            :key="cell.date.getTime()"
            class="keyment-date-picker__cell"
            :class="{
              'is-prev': cell.type === 'prev',
              'is-next': cell.type === 'next',
              'is-selected': isSelectedDate(cell.date),
              'is-today': isToday(cell.date),
              'is-disabled': isDisabledDate(cell.date)
            }"
            type="button"
            :disabled="isDisabledDate(cell.date)"
            @click="handleSelectDate(cell.date)"
          >
            {{ cell.text }}
          </button>
          </div>
        </template>
        <!-- 切换月份面板 -->
        <div
          v-else-if="panelMode === 'month'"
          class="keyment-date-picker__months"
        >
          <button
            v-for="(month, index) in months"
            :key="month"
            class="keyment-date-picker__month-cell"
            :class="{ 'is-selected': isSelectedMonth(index) }"
            type="button"
            @click="handleSelectMonth(index)"
          >
            {{ month }}
          </button>
        </div>

        <div
          v-else-if="panelMode === 'year'"
          class="keyment-date-picker__years"
        >
          <button
            v-for="year in yearCells"
            :key="year"
            class="keyment-date-picker__year-cell"
            :class="{ 'is-selected': isSelectedYear(year) }"
            type="button"
            @click="handleSelectYear(year)"
          >
            {{ year }}
          </button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount, onMounted } from "vue";
import type { DatePickerEmits, DatePickerProps,DatePanelMode,DatePickerSingleValue } from "./date-picker";
import { Calendar } from "@keyment/icons";

defineOptions({
  name: "KyDatePicker"
});
// 鼠标是否停留在日期选择器上，用来控制清空按钮显示。
const isHovering = ref(false);

// 日期选择器根元素，用来判断点击位置是不是在组件内部,这里是拿到根元素
const datePickerRef = ref<HTMLElement>();

const props = withDefaults(defineProps<DatePickerProps>(), {
  disabled: false,
  readonly: false,
  clearable: false,
  format: "YYYY-MM-DD",
  size: "default",
  editable: true,
  type: "date"
});

const emit = defineEmits<DatePickerEmits>();

  // 日期选择器 class。
const datePickerClass = computed(() => {
  return {
    [`keyment-date-picker--${props.size}`]: props.size
  };
});

// 格式化函数
// 补0
const padZero = (value: number) => {
  return String(value).padStart(2, "0");
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());

  return `${year}-${month}-${day}`;
};
// formatDate一定是 Date 对象 formatModelValue	可能是 Date / string / null
const formatModelValue = (value: DatePickerSingleValue) => {
  if (value instanceof Date) {
    return formatDate(value);
  }

  return value;
};

type DateCellType = "prev" | "current" | "next";

interface DateCell {
  text: number; // 日期格子上显示的数字
  date: Date; // 这个格子对应的真实日期
  type: DateCellType; // 这个日期属于上个月、当前月、还是下个月
}

// 日期面板是否显示。
const panelVisible = ref(false);
const panelMode = ref<DatePanelMode>("date"); // 面板里面显示什么内容
const months = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月"
];
// 筛选月份
const handleSelectMonth = (monthIndex: number) => {
  panelDate.value = new Date(
    panelDate.value.getFullYear(),
    monthIndex,
    1
  );
  if(props.type === "month"){
    const value = `${panelDate.value.getFullYear()}-${padZero(panelDate.value.getMonth() + 1)}`;

    emit("update:modelValue", value);
    emit("change", value);

    panelVisible.value = false;
    return;
  }
  panelMode.value = "date";
};

// 获得最近10年的年份
const yearCells = computed(() => {
  const currentYear = panelDate.value.getFullYear();
  const startYear = currentYear - 5;

  const years = [];

  for (let year = startYear; year < startYear + 10; year++) {
    years.push(year);
  }

  return years;
});
// 筛选年份
const handleSelectYear = (year: number) => {
  panelDate.value = new Date(
    year,
    panelDate.value.getMonth(),
    1
  );
  if (props.type === "year") {
    const value = String(year);

    emit("update:modelValue", value);
    emit("change", value);

    panelVisible.value = false;
    return;
  }
  panelMode.value = "month";
};
// 年份/月份面板 选中态
const isSelectedMonth = (monthIndex: number) => {
  return panelDate.value.getMonth() === monthIndex;
};

const isSelectedYear = (year: number) => {
  return panelDate.value.getFullYear() === year;
};
  // 输入框中显示的值。
// 第一版先直接把 modelValue 转成字符串显示，后面再做真正的日期格式化。
const displayValue = computed(() => {
  if (!props.modelValue) {
    return "";
  }

  if (Array.isArray(props.modelValue)) {
    const [start, end] = props.modelValue;

    const startText = start ? formatModelValue(start) : "";
    const endText = end ? formatModelValue(end) : "";

    if (!startText && !endText) {
      return "";
    }

    return `${startText} ${props.rangeSeparator} ${endText}`;
  }

  return formatModelValue(props.modelValue);
});

// 判断是不是范围选择
const isRange = computed(() => {
  return (
    props.type === "daterange" ||
    props.type === "monthrange" ||
    props.type === "yearrange"
  );
});
// 当前组件是不是“选月份”的类型
const isMonthType = computed(() => {
  return props.type === "month" || props.type === "monthrange";
});

// 当前组件是不是“选年份”的类型
const isYearType = computed(() => {
  return props.type === "year" || props.type === "yearrange";
});


// 打开面板时根据 type 决定默认显示哪个面板。
const getDefaultPanelMode = (): DatePanelMode => {
  if (isYearType.value) {
    return "year";
  }

  if (isMonthType.value) {
    return "month";
  }

  return "date";
};
const rangeStartText = computed(() => {
  if (!Array.isArray(props.modelValue)) {
    return "";
  }

  const [start] = props.modelValue;

  return start ? formatModelValue(start) : "";
});

const rangeEndText = computed(() => {
  if (!Array.isArray(props.modelValue)) {
    return "";
  }

  const [, end] = props.modelValue;

  return end ? formatModelValue(end) : "";
});
// 是否显示清空按钮。
const showClear = computed(() => {
  return props.clearable && !props.disabled && !!props.modelValue&& isHovering.value;;
});

// 打开日期面板。
const handleOpen = () => {
  if (props.disabled) {
    return;
  }
  // 如果本来有值,就判断是否是date对象
  if (props.modelValue) {
    const value =
      props.modelValue instanceof Date
        ? props.modelValue
        : new Date(props.modelValue);

    panelDate.value = new Date(value.getFullYear(), value.getMonth(), 1);
  } else {
    panelDate.value = new Date();
  }
  panelVisible.value = true;
  panelMode.value = getDefaultPanelMode();
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
  panelVisible.value = false;
};


// 日期面板,面板当前在看的月份
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

// 日期数组：包含上个月补位日期、当前月日期、下个月补位日期。
const dateCells = computed<DateCell[]>(() => {
  const cells: DateCell[] = [];

  const year = panelDate.value.getFullYear();
  const month = panelDate.value.getMonth();

  // 上个月最后一天是几号，用来生成面板前面的灰色补位日期。
  const prevMonthLastDate = new Date(year, month, 0).getDate();

  // 生成上个月补位日期。
  for (let index = startWeekDay.value - 1; index >= 0; index--) {
    const day = prevMonthLastDate - index;

    cells.push({
      text: day,
      date: new Date(year, month - 1, day),
      type: "prev"
    });
  }

  // 生成当前月日期。
  for (let day = 1; day <= daysInMonth.value; day++) {
    cells.push({
      text: day,
      date: new Date(year, month, day),
      type: "current"
    });
  }

  // 生成下个月补位日期，保证面板总格子数是 42 个，也就是 6 行 7 列。
  const nextCount = 42 - cells.length;

  for (let day = 1; day <= nextCount; day++) {
    cells.push({
      text: day,
      date: new Date(year, month + 1, day),
      type: "next"
    });
  }

  return cells;
});

// 选择日期的函数
const handleSelectDate = (date: Date) => {
  if (isDisabledDate(date)) {
    return;
  }

  const value = formatDate(date);

  emit("update:modelValue", value);
  emit("change", value);

  panelVisible.value = false;
};

// 判断某一天是否被禁用。
const isDisabledDate = (date: Date) => {
  // 这里的props.disableDate 是用户定义的条件函数
  if (!props.disabledDate) {
    return false;
  }

  return props.disabledDate(date);
};

// 判断日历面板上某个格子是不是当前选中的日期，用于高亮那个格子
const isSelectedDate = (date: Date) => {
  if (!props.modelValue) {
    return false;
  }

  const value =
    props.modelValue instanceof Date
      ? props.modelValue
      : new Date(props.modelValue);

  return (
    value.getFullYear() === date.getFullYear() &&
    value.getMonth() === date.getMonth() &&
    value.getDate() === date.getDate()
  );
};

// 日期面板最上面年月
const panelYear = computed(() => {
  return panelDate.value.getFullYear();
});

const panelMonth = computed(() => {
  return panelDate.value.getMonth() + 1;
});

// 切换月份的函数
const handlePrevMonth = () => {
  panelDate.value = new Date(
    panelDate.value.getFullYear(),
    panelDate.value.getMonth() - 1,
    1
  );
};

const handleNextMonth = () => {
  panelDate.value = new Date(
    panelDate.value.getFullYear(),
    panelDate.value.getMonth() + 1,
    1
  );
};
// 切换年份的函数
const handlePrevYear = () => {
  panelDate.value = new Date(
    panelDate.value.getFullYear() - 1,
    panelDate.value.getMonth(),
    1
  );
};
const handleNextYear = () => {
  panelDate.value = new Date(
    panelDate.value.getFullYear() + 1,
    panelDate.value.getMonth(),
    1
  );
};


// 获得今天的日期,然后和日期选择器的日期进行对比找到今天，进行高亮
const isToday = (date: Date) => {
  const today = new Date();

  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

// 点击页面其他地方时，关闭日期面板。
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;  // 点击的具体元素

  if (!datePickerRef.value) {
    return;
  }
  // contains 是原生 DOM 方法，判断一个元素是不是另一个的子孙
  // 面板里找不到点击的元素
  // 返回 true  → 点在面板里面 → 什么都不做
  // 返回 false → 点在面板外面 → 关闭面板
  if (!datePickerRef.value.contains(target)) {  
    panelVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
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
  padding: 0 32px 0 32px;
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

.keyment-date-picker--large .keyment-date-picker__inner {
  height: 40px;
  font-size: 14px;
  line-height: 40px;
}

.keyment-date-picker--small .keyment-date-picker__inner {
  height: 24px;
  font-size: 12px;
  line-height: 24px;
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
  z-index: 1;
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

.keyment-date-picker__cell.is-disabled  {
  background: #f5f7fa;
  border-radius: 4px;
  color: #c0c4cc;
  cursor: not-allowed;
}

.keyment-date-picker__cell.is-disabled:hover {
  background: #f5f7fa;
  color: #c0c4cc;
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
.keyment-date-picker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  margin-bottom: 8px;
  color: #303133;
  font-size: 14px;
  font-weight: 500;
}

.keyment-date-picker__header-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #606266;
  font-size: 18px;
  cursor: pointer;
}

.keyment-date-picker__header-btn:hover {
  color: #409eff;
}
.keyment-date-picker__cell.is-today {
  color: #409eff;
  font-weight: 700;
}

.keyment-date-picker__cell.is-selected {
  background: #409eff;
  color: #ffffff;
}
.keyment-date-picker__icon {
  position: absolute;
  top: 50%;
  left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  color: #a8abb2;
  pointer-events: none;
  transform: translateY(-50%);
}

.keyment-date-picker__icon :deep(svg) {
  width: 1em;
  height: 1em;
}
.keyment-date-picker__cell.is-prev,
.keyment-date-picker__cell.is-next {
  color: #c0c4cc;
}

.keyment-date-picker__cell.is-today {
  color: #409eff;
  font-weight: 700;
}

.keyment-date-picker__cell.is-selected {
  background: #409eff;
  color: #ffffff;
}
.keyment-date-picker__header-left,
.keyment-date-picker__header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}
.keyment-date-picker__header-label {
  border: none;
  background: transparent;
  color: #303133;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.keyment-date-picker__header-label:hover {
  color: #409eff;
}
.keyment-date-picker__months {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 8px 0;
}

.keyment-date-picker__month-cell {
  height: 36px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #606266;
  cursor: pointer;
}

.keyment-date-picker__month-cell:hover {
  color: #409eff;
}
.keyment-date-picker__years {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 8px 0;
}

.keyment-date-picker__year-cell {
  height: 36px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #606266;
  cursor: pointer;
}

.keyment-date-picker__year-cell:hover {
  color: #409eff;
}
.keyment-date-picker__month-cell.is-selected,
.keyment-date-picker__year-cell.is-selected {
  background: #409eff;
  color: #ffffff;
}
.keyment-date-picker__range {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 32px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  cursor: pointer;
  transition: border-color 0.2s;
}

.keyment-date-picker__range:focus-within {
  border-color: #409eff;
}

.keyment-date-picker__range-input {
  min-width: 0;
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #606266;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

.keyment-date-picker__range-input:disabled {
  color: #a8abb2;
  cursor: not-allowed;
}

.keyment-date-picker__range-separator {
  flex: none;
  padding: 0 8px;
  color: #909399;
  font-size: 14px;
}
</style>
