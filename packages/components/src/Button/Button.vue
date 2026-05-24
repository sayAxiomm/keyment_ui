<template>
  <!-- 
   : 是 Vue 的动态绑定。
    原生 button 的 type 由外部传入的 nativeType 决定。 
  -->
    <button
    class="keyment-button"
    :class="buttonClass"
    :type="props.nativeType" 
    :disabled="props.disabled || props.loading"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: "ky-Button"
});


// 定义 props，本质是为了让组件变成“可配置的组件”，而不是一个固定样式的普通
// 定义 props 数据类型
type ButtonType = "default" | "primary" | "success" | "warning" | "danger";
type ButtonSize = "small" | "default" | "large";

// 原生 button 的 type 属性，避免和组件视觉类型 type 混淆
type ButtonNativeType = "button" | "submit" | "reset";
// withDefaults 给可选 props 设置默认值,<>代表泛型
const props = withDefaults(defineProps<{
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  round?: boolean; 
  nativeType?: ButtonNativeType; // 原生 button type，例如表单提交时用 submit
}>(), {
  type: "default",
  size: "default",
  disabled: false,
  loading: false,
  round: false,
  nativeType: "button"
});

//组件库一般会把Button状态变成button的类名,然后 CSS 根据类名控制样式
const buttonClass = computed(() => [
  `keyment-button--${props.type}`,
  `keyment-button--${props.size}`,
  {
    "is-disabled": props.disabled,// 禁用状态类
    "is-loading": props.loading, // 加载状态类
    "is-round": props.round // 圆角状态类
  }
]);
</script>

<style scoped>
/* 静态布局 */
.keyment-button {
  /* 对外像 inline-block，多个按钮可以自然排在一行,对内像 flex，按钮内部内容可以用 flex 居中。 */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* 基础尺寸 */
  height: 32px;
  padding: 8px 15px;

  /* 基础边框和圆角 */
  border: 1px solid #dcdfe6;
  border-radius: 4px;

  /* 基础背景和文字 */
  background: #ffffff;
  color: #303133;

  /* 按钮文字和鼠标交互 */
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  /* 去掉浏览器默认按钮样式差异 */
  outline: none;
  }

  /* 默认按钮 hover 状态 */
.keyment-button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background: #ecf5ff;
}

/* primary 按钮 */
.keyment-button--primary {
  color: #ffffff;
  border-color: #409eff;
  background: #409eff;
}

.keyment-button--primary:hover {
  color:#ffffff;
  border-color: #66b1ff;
  background: #66b1ff;
}
/* success 按钮 */
.keyment-button--success {
  color: #ffffff;
  border-color: #67c23a;
  background: #67c23a;
}

.keyment-button--success:hover {
  color:#ffffff;
  border-color: #85ce61;
  background: #85ce61;
}

/* warning 按钮 */
.keyment-button--warning {
  color: #ffffff;
  border-color: #e6a23c;
  background: #e6a23c;
}

.keyment-button--warning:hover {
  color:#ffffff;
  border-color: #ebb563;
  background: #ebb563;
}

/* danger 按钮 */
.keyment-button--danger {
  color: #ffffff;
  border-color: #f56c6c;
  background: #f56c6c;
}

.keyment-button--danger:hover {
  color:#ffffff;
  border-color: #f78989;
  background: #f78989;
}

/* small 尺寸 */
.keyment-button--small {
  height: 28px;
  padding: 0 10px;
  font-size: 12px;
}

/* large 尺寸 */
.keyment-button--large {
  height: 40px;
  padding: 0 18px;
  font-size: 16px;
}

/* 圆角按钮 */
.keyment-button.is-round {
  border-radius: 999px;
}

/* 禁用和加载中都不允许交互 */
.keyment-button.is-disabled,
.keyment-button.is-loading {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 禁用时不响应 hover 变色 */
.keyment-button.is-disabled:hover,
.keyment-button.is-loading:hover {
  color: inherit;
}
</style>
