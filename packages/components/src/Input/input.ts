import type { Component } from "vue";
export type InputType = "text" | "password" | "textarea";
export type InputSize = "large" | "default" | "small";

export interface InputProps {
// 一期
  modelValue?: string;
  type?: InputType;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean; // 是否只读
  name?: string;
  id?: string;
// 二期
  clearable?: boolean;  // 是否显示清空按钮。
  showPassword?: boolean;
  size?: InputSize;
  prefixIcon?: Component; // 前置图标
  suffixIcon?: Component; // 后置图标
  maxlength?: number; // 最大输入长度
  minlength?: number; // 最小输入长度
  showWordLimit?: boolean;  // 字数统计
}

export interface InputEmits {
  (event: "update:modelValue", value: string): void;
  (event: "input", value: string): void; // 每输入一个字都触发
  (event: "change", value: string): void; // 完成输入之后后触发
  (event: "focus", value: FocusEvent): void;  // 获得焦点
  (event: "blur", value: FocusEvent): void;
  (event: "clear"): void; // 点击清空按钮时触发。
}