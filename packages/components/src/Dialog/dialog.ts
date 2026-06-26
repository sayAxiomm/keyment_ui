export interface DialogProps {
  modelValue?: boolean; // 是否显示对话框
  title?: string; // 对话框标题
  width?: string; // 对话框宽度
  closeOnClickModal?: boolean; // 是否可以点击遮罩关闭
  closeOnPressEscape?: boolean; // 是否可以按 ESC 关闭
  showClose?: boolean; // 是否显示关闭按钮
}

export interface DialogEmits {
  (event: "update:modelValue", value: boolean): void; // v-model 更新显示状态
  (event: "open"): void; // 对话框打开时触发
  (event: "close"): void; // 对话框关闭时触发
}