import type { Component } from "vue";

// Link 的视觉类型。
// 和 Button 保持一致，方便用户理解。
export type LinkType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

// Link 组件对外暴露的 props。
export interface LinkProps {
  
  type?: LinkType;// 控制链接颜色类型。
  disabled?: boolean;// 是否禁用。
  underline?: boolean;// 是否显示下划线。
  href?: string;// 原生 a 标签的 href。
  // 原生 a 标签的 target。
  // 例如 target="_blank" 表示新窗口打开。
  target?: string;
  // 链接左侧图标。
  // 这里和 Button 一样，接收 Vue 组件，比如 Plus / Edit / Search。
  icon?: Component;
}