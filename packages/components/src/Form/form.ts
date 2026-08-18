export type FormLabelPosition = "left" | "right" | "top";
export type FormValidateTrigger = "blur" | "change";
export type FormRuleValidator = (value: unknown) => boolean | string | Promise<boolean | string>;

export interface FormRule {
  required?: boolean; // 是否必填
  message?: string; // 校验失败时显示的错误信息
  trigger?: FormValidateTrigger | FormValidateTrigger[]; // 触发校验的时机
  min?: number; // 最小长度
  max?: number; // 最大长度
  pattern?: RegExp; // 正则校验规则
  validator?: FormRuleValidator; // 自定义校验函数
}

export type FormRules = Record<string, FormRule | FormRule[]>;

export interface FormProps {
  model?: Record<string, unknown>; // 表单数据对象
  rules?: FormRules; // 表单校验规则
  labelWidth?: string | number; // label 宽度
  labelPosition?: FormLabelPosition; // label 对齐方式
}

export interface FormItemProps {
  label?: string; // 表单项标题
  prop?: string; // 对应 model 里的字段名
  required?: boolean; // 是否显示必填星号
  error?: string; // 外部传入的错误提示文本
}

export interface FormItemContext {
  prop: string | undefined; // 当前表单项对应的字段名
  validate: (trigger?: FormValidateTrigger) => Promise<boolean>; // 校验当前表单项
  clearValidate: () => void; // 清空当前表单项校验状态
}

export interface FormContext {
  model: Record<string, unknown> | undefined; // ky-form 传给 ky-form-item 的表单数据对象
  rules: FormRules | undefined; // ky-form 传给 ky-form-item 的校验规则
  labelWidth: string | number; // ky-form 统一传给 ky-form-item 的 label 宽度
  labelPosition: FormLabelPosition; // ky-form 统一传给 ky-form-item 的 label 位置
  addField: (field: FormItemContext) => void; // 收集内部 form-item
  removeField: (field: FormItemContext) => void; // 移除内部 form-item
}
