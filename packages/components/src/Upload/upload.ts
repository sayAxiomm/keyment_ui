export type UploadMethod = "post" | "put" | "patch";
export type UploadBeforeUpload = (
  file: UploadFile
) => boolean | Promise<boolean>;
export type UploadStatus = "ready" | "uploading" | "success" | "error";

export interface UploadProps {
  disabled?: boolean; // 是否禁用上传
  multiple?: boolean; // 是否支持多选
  accept?: string; // 接受的文件类型，例如 image/*、.png、.pdf
  name?: string; // 原生 input 的 name
  action?: string; // 上传接口地址
  method?: UploadMethod; // 上传请求方法
  data?: Record<string, string | number | boolean>; // 上传时额外携带的表单数据
  headers?: Headers|Record<string, any>; // 上传请求头，例如 token
  autoUpload?: boolean; // 是否在选择文件后自动上传
  limit?: number; // 最大允许选择的文件数量
  showFileList?: boolean; // 是否显示文件列表
  onSuccess?: (response: unknown, file: UploadFile) => void; // 上传成功后触发
  onError?: (error: unknown, file: UploadFile) => void; // 上传失败后触发
  onRemove?: (file: UploadFile, files: UploadFile[]) => void; // 移除文件后触发
  beforeUpload?: UploadBeforeUpload; // 上传前触发，返回 false 时停止上传
}

// 描述的是选择的文件本身 
export interface UploadFile {
  raw: File; // 浏览器原生 File 对象，真正上传时会用到
  name: string; // 文件名，例如 avatar.png
  size: number; // 文件大小，单位 byte
  type: string; // 文件类型，例如 image/png
  status: UploadStatus; // 当前文件状态
}

// Upload 组件可以往外发什么事件，以及事件会带什么数据
export interface UploadEmits {
  (event: "remove", file: UploadFile, files: UploadFile[]): void; // 移除文件后触发
  (event: "change", files: UploadFile[]): void; // 用户选择文件后触发，files 是选择到的文件列表
  (event: "exceed", files: File[], uploadFiles: UploadFile[]): void; // 超出 limit 时触发
  (event: "success", response: unknown, file: UploadFile): void; // 上传成功后触发
  (event: "error", error: unknown, file: UploadFile): void; // 上传失败后触发
}
