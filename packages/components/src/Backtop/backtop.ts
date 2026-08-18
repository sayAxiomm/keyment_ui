export interface BacktopProps {
  visibilityHeight?: number; // 滚动高度达到这个值后显示
  right?: number; // 按钮距离右侧距离
  bottom?: number; // 按钮距离底部距离
}

export interface BacktopEmits {
  (event: "click", value: MouseEvent): void; // 点击按钮时触发
}
