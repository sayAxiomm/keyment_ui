import type { Component } from "vue";

export type SwitchValue = string | number | boolean;
export type SwitchSize = "large" | "default" | "small";
export type SwitchIcon = string | Component;

export interface SwitchProps {
  modelValue?: SwitchValue;
  disabled?: boolean;
  size?: SwitchSize;
  loading?: boolean;
  width?: number;
  activeValue?: SwitchValue;
  inactiveValue?: SwitchValue;
  name?: string;
  id?: string;
  activeText?: string; // 打开时文字
  inactiveText?: string; // 关闭时文字
  inactiveColor?: string; // 关闭时背景色
  activeColor?: string; // 打开时背景色
  validateEvent?: boolean;
  inlinePrompt?: boolean; // 文字是否显示在 switch 内部
  activeIcon?: SwitchIcon; // switch状态为on，滑轨图标 设置此项会忽略 active-text
  inactiveIcon?: SwitchIcon; // off 同上
  activeActionIcon?: SwitchIcon; // switch状态为on 小圆点图标
  inactiveActionIcon?: SwitchIcon; // off 同上
}

export interface SwitchEmits {
  (event: "update:modelValue", value: SwitchValue): void;
  (event: "change", value: SwitchValue): void;
}
