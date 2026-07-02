export type MessageType = "success" | "warning" | "info" | "error";

export interface MessageProps {
  message?: string; // 消息文字
  type?: MessageType; // 消息类型
  duration?: number; // 显示时间，单位毫秒
  showClose?: boolean; // 是否显示关闭按钮
}

export interface MessageOptions {
  message?: string; // 消息文字
  type?: MessageType; // 消息类型
  duration?: number; // 显示时间，单位毫秒
  showClose?: boolean; // 是否显示关闭按钮
}

export interface MessageInstance {
  close: () => void; // 手动关闭消息
}