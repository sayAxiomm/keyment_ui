// checkbox 单项的值类型。
export type CheckboxValue = string | number | boolean| object;
export type CheckboxModelValue = string | number | boolean;
export type CheckboxSize = "large" | "default" | "small";
// export type CheckboxTrueFalseValue = string | number;
export type CheckboxGroupValue = CheckboxValue[]; // group的model类型

// checkbox的props类型
export interface CheckboxProps{
 modelValue?: CheckboxModelValue;
 value?:CheckboxValue; // value 是写在 Checkbox 组件上的，但它主要是为了 group 场景 服务。
 disabled?: boolean;
  border?: boolean;
  size?: CheckboxSize;
  name?: string;
  trueValue?: CheckboxModelValue;
  falseValue?: CheckboxModelValue;
  indeterminate?:boolean; // 设置不确定状态，仅负责样式控制
  validateEvent?:boolean // 是否触发表单校验。
}
export interface CheckboxEmits {
  // Vue v-model 约定事件。
  // 当 checkbox 切换时，用它通知父组件更新 modelValue。
  (event: "update:modelValue", value: CheckboxModelValue): void;

  // change 事件。
  // 用来通知外部 checkbox 的值发生变化。
  (event: "change", value: CheckboxModelValue): void;
}

// checkbox group 的 props 类型
export interface CheckboxGroupProps {
  modelValue?: CheckboxGroupValue; // 多选，所以是数组。
  disabled?: boolean;
  border?: boolean;
  size?: CheckboxSize;
  name?: string;
  min?: number; // 最少选几个。
  max?: number; // 最多选几个。
  textColor?:string;
  fill?: string;
  // 是否触发表单校验。
  validateEvent?: boolean;
}

export interface CheckboxGroupEmits {
  (event: "update:modelValue", value: CheckboxGroupValue): void;
  (event: "change", value: CheckboxGroupValue): void;
}
// checkbox.vue 从 group 那里拿到的数据长什么样
export interface CheckboxGroupContext {
  modelValue?: CheckboxGroupValue;
  disabled?: boolean;
  border?: boolean;
  size?: CheckboxSize;
  name?: string;
  min?: number;
  max?: number;
  textColor?: string;
  fill?: string;
  validateEvent?: boolean;
  changeEvent: (value: CheckboxValue) => void;
}