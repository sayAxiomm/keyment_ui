export type MessageType = "success" | "warning" | "info" | "error";

export interface MessageProps {
  message?: string; // 消息文字
  type?: MessageType; // 消息类型
  duration?: number; // 显示时间，单位毫秒
  showClose?: boolean; // 是否显示关闭按钮
  onClose?: () => void; // 关闭消息时触发
  offset?: number; // 消息距离顶部的距离
}

export interface MessageOptions {
  message?: string; // 消息文字
  type?: MessageType; // 消息类型
  duration?: number; // 显示时间，单位毫秒
  showClose?: boolean; // 是否显示关闭按钮
}

export type MessageParams = string | MessageOptions;

export interface MessageFn {
  (options: MessageParams): MessageInstance; // 创建普通消息
  success: (options: MessageParams) => MessageInstance; // 创建成功消息
  warning: (options: MessageParams) => MessageInstance; // 创建警告消息
  info: (options: MessageParams) => MessageInstance; // 创建普通提示消息
  error: (options: MessageParams) => MessageInstance; // 创建错误消息
}

export interface MessageInstance {
  close: () => void; // 手动关闭消息
  updateOffset: (offset: number) => void; // 更新消息距离顶部的位置
}
