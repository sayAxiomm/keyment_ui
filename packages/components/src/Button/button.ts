// 按钮视觉类型：控制按钮颜色风格。
export type ButtonType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

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
}
