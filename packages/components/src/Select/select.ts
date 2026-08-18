export type SelectValue = string | number | boolean;
export type SelectModelValue = SelectValue | SelectValue[];
export type SelectSize = "large" | "default" | "small";

// select 的 props 类型
export interface SelectProps {
  modelValue?: SelectModelValue; // v-model 绑定值
  placeholder?: string; // 占位文本
  disabled?: boolean; // 是否禁用
  clearable?: boolean; // 是否可以清空
  size?: SelectSize; // 选择器尺寸
  multiple?: boolean; // 是否支持多选
}

// option 的 props 类型
export interface OptionProps {
  value: SelectValue; // 选项的真实值
  label?: string; // 选项显示文本，不传时默认显示 value
  disabled?: boolean; // 是否禁用当前选项
}

// option 整理后传给 select 的完整选项数据
// 就是通信的数据包
export interface SelectOption {
  value: SelectValue; // 选项真实值
  label: string; // 选项显示文本
  disabled?: boolean; // 是否禁用
}
// select 提供给 option 使用的上下文
export interface SelectContext {
  modelValue: SelectModelValue | undefined; // 当前选中的值
  multiple: boolean; // 是否是多选
  selectOption: (option: SelectOption) => void; // 选中某个 option
}

// select 触发的事件类型
export interface SelectEmits {
  (event: "update:modelValue", value: SelectModelValue | undefined): void; // Vue v-model 约定事件，选中选项时通知父组件更新 modelValue
  (event: "change", value: SelectModelValue | undefined): void; // 选中值变化时触发
  (event: "clear"): void; // 点击清空按钮时触发
  (event: "focus", value: FocusEvent): void; // 获得焦点
  (event: "blur", value: FocusEvent): void; // 失去焦点
}
