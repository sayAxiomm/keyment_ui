export type DatePickerSingleValue = Date | string;
export type DatePickerRangeValue = [DatePickerSingleValue, DatePickerSingleValue];
export type DatePickerValue = DatePickerSingleValue | DatePickerRangeValue;
export type DatePickerSize = "large" | "default" | "small";
export type DatePickerDisabledDate = (date: Date) => boolean;
export type DatePanelMode = "date" | "month"| 'year';
export type DatePickerType = "date" | "month" | "year"| "daterange"| "monthrange"|"yearrange";
// date-picker 的 props 类型
export interface DatePickerProps {
// 一期
  modelValue?: DatePickerValue; // v-model 绑定值
  placeholder?: string; // 占位文本
  disabled?: boolean; // 是否禁用
  readonly?: boolean; // 是否只读
  clearable?: boolean; // 是否可以清空
  format?: string; // 日期显示格式，后面做格式化时使用
// 二期
  size?: DatePickerSize; // 日期选择器尺寸
  editable?: boolean; // 是否允许手动输入
  disabledDate?: DatePickerDisabledDate; // 设置不可选择的日期
  type?: DatePickerType; // 日期选择器类型：date / month / year
  startPlaceholder?: string;
  endPlaceholder?: string;
  rangeSeparator?:string; // 中间分隔符
  unlinkPanels?: boolean; // 范围选择时，左右两个面板是否取消联动
}
// date-picker 触发的事件类型
export interface DatePickerEmits {
  (event: "update:modelValue", value: DatePickerValue | undefined): void; // Vue v-model 约定事件，选中日期时通知父组件更新 modelValue
  (event: "change", value: DatePickerValue | undefined): void; // change 用来通知外部日期发生变化
  (event: "focus", value: FocusEvent): void; // 获得焦点
  (event: "blur", value: FocusEvent): void; // 失去焦点
  (event: "clear"): void; // 点击清空按钮时触发
}
