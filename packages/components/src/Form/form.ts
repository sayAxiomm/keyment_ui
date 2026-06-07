export type FormLabelPosition = "left" | "right" | "top";
export type FormValidateTrigger = "blur" | "change";

export interface FormRule {
  required?: boolean; // 是否必填
  message?: string; // 校验失败时显示的错误信息
  trigger?: FormValidateTrigger | FormValidateTrigger[]; // 什么时候触发校验
}

export type FormRules = Record<string, FormRule | FormRule[]>;

export interface FormProps {
  model?: Record<string, any>; // 表单数据对象
  rules?: FormRules; // 表单校验规则
  labelWidth?: string | number; // label 宽度
  labelPosition?: FormLabelPosition; // label 对齐方式
}

export interface FormItemProps {
  label?: string; // 表单项标题
  prop?: string; // 对应 model 里的字段名，后面做校验会用
  required?: boolean; // 是否显示必填星号
  error?: string; // 表单项错误提示文本
}

export interface FormContext {
  model: Record<string, unknown> | undefined; // ky-form 传给 ky-form-item 的表单数据对象
  rules: FormRules | undefined; // ky-form 传给 ky-form-item 的校验规则
  labelWidth: string | number; // ky-form 统一传给 ky-form-item 的 label 宽度
  labelPosition: FormLabelPosition; // ky-form 统一传给 ky-form-item 的 label 位置
}
