// 单选框的值通常可以是 string / number / boolean。
export type RadioValue = string | number | boolean;

// Radio 的尺寸。
export type RadioSize = "large" | "default" | "small";

// 单个 Radio 的 props。
export interface RadioProps {
  // 当前 Radio 对应的值。
  // 当 modelValue === value 时，表示这个 Radio 被选中。
  value: RadioValue;

  // v-model 传进来的当前选中值。
  modelValue?: RadioValue;

  // 是否禁用当前 Radio。
  disabled?: boolean;

  // 原生 input 的 name。
  // 同一组 radio 通常应该有相同 name。
  name?: string;
  border?:boolean; // 是否有边框
  size?:RadioSize // 尺寸,只有有边框才生效
}
// radio-button的props
export interface RadioButtonProps {
  value: RadioValue;
  modelValue?: RadioValue;
  disabled?: boolean;
  name?: string;
  size?: RadioSize;
}
// RadioGroup 的 props。
export interface RadioGroupProps {
  // v-model 传进来的当前选中值。
  modelValue?: RadioValue;

  // 是否禁用整组 Radio。
  disabled?: boolean;

  // 是否给组内 Radio 显示边框。
  border?: boolean;

  // 组内 Radio 尺寸。
  size?: RadioSize;

  // 传给内部 radio 的 name。
  name?: string;
   // 现在我们还没有 Form 组件，所以先保留这个 API，后面做 Form 时再接入。
  validateEvent?: boolean;

  // 按钮形式 Radio 激活时的文本颜色。
  textColor?: string;

  // 按钮形式 Radio 激活时的背景色和边框色。
  fill?: string;
}

// radio.vue 从 group 那里拿到的数据长什么样
export interface RadioGroupContext {
  // 当前这一组 radio 选中的值
  modelValue?: RadioValue;
  // 整组是否禁用
  disabled?: boolean;
  // 组内 radio 是否显示边框
  border?: boolean;
  // 组内 radio 尺寸
  size?: RadioSize;
  // 原生 input 的 name
  name?: string;
  validateEvent?: boolean;
  textColor?: string;
  fill?: string;
  // 子 radio 点击后调用它，让 group 更新选中值
  changeEvent: (value: RadioValue) => void;
}


// Radio 组件触发的事件类型。
export interface RadioEmits {
  // Vue v-model 约定：更新 modelValue 时触发 update:modelValue。
  (event: "update:modelValue", value: RadioValue): void;

  // change 用来通知外部值发生变化。
  (event: "change", value: RadioValue): void;
}

// RadioGroup 组件触发的事件类型。
export interface RadioGroupEmits {
  (event: "update:modelValue", value: RadioValue): void;
  (event: "change", value: RadioValue): void;
}
