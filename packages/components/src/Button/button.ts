// 让 Button 支持这个用法<ky-button :icon="Plus">新增</ky-button>
// 这里的 Plus 是vue组件
// 那 TypeScript 里怎么描述“一个 Vue 组件”
// Vue 官方给了一个类型 Component
import type { Component } from "vue";
// 按钮视觉类型：控制按钮颜色风格。
export type ButtonType = "default" | "primary" | "success" | "warning" | "danger" | "info";

// 按钮尺寸：控制按钮高度、字号、内边距。
export type ButtonSize = "small" | "default" | "large";

// 原生 button 的 type 属性，避免和组件视觉类型 type 混淆。
export type ButtonNativeType = "button" | "submit" | "reset";

// Button 组件对外暴露的 props。
export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  round?: boolean;
  plain?: boolean;
  nativeType?: ButtonNativeType;
  icon?: Component;
}
