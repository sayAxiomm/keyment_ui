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
    <KyIcon v-if="props.icon" class="keyment-button__icon">
      <!-- 这是 Vue 的动态组件语法。
       普通组件是固定的：
       但这里 Button 不知道用户传的是 Plus、Minus、Search 还是别的图标。
       要写成动态的：
       所以不能写死： -->
      <component :is="props.icon" />
    </KyIcon>
    <!-- 要给文字加一个包裹层，方便后面控制图标和文字之间的间距。 -->
    <span v-if="$slots.default" class="keyment-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ButtonProps } from "./button";
import { KyIcon } from "../icon";

defineOptions({
  name: "KyButton"
});

// 定义 props，本质是为了让组件变成“可配置的组件”，而不是一个固定样式的普通
// withDefaults 给可选 props 设置默认值,<>代表泛型
const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  size: "default",
  disabled: false,
  loading: false,
  round: false,
  plain: false,
  nativeType: "button"
});

//组件库一般会把Button状态变成button的类名,然后 CSS 根据类名控制样式
const buttonClass = computed(() => [
  `keyment-button--${props.type}`,
  `keyment-button--${props.size}`,
  {
    "is-disabled": props.disabled, // 禁用状态类
    "is-loading": props.loading, // 加载状态类
    "is-round": props.round, // 圆角状态类
    "is-plain": props.plain
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

.keyment-button__icon {
  font-size: 1em;
  flex-shrink: 0;
}

/* 
  只有当文字紧跟在图标后面时，才加间距。
  也就是：有图标 + 有文字。
*/
.keyment-button__icon + .keyment-button__text {
  margin-left: 6px;
}

.keyment-button__text {
  display: inline-flex;
  align-items: center;
}

/* 默认按钮 hover 状态 */
.keyment-button:not(.is-disabled):not(.is-loading):hover {
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

.keyment-button--primary:not(.is-disabled):not(.is-loading):hover {
  color: #ffffff;
  border-color: #66b1ff;
  background: #66b1ff;
}
/* success 按钮 */
.keyment-button--success {
  color: #ffffff;
  border-color: #67c23a;
  background: #67c23a;
}

.keyment-button--success:not(.is-disabled):not(.is-loading):hover {
  color: #ffffff;
  border-color: #85ce61;
  background: #85ce61;
}

/* warning 按钮 */
.keyment-button--warning {
  color: #ffffff;
  border-color: #e6a23c;
  background: #e6a23c;
}

.keyment-button--warning:not(.is-disabled):not(.is-loading):hover {
  color: #ffffff;
  border-color: #ebb563;
  background: #ebb563;
}

/* danger 按钮 */
.keyment-button--danger {
  color: #ffffff;
  border-color: #f56c6c;
  background: #f56c6c;
}

.keyment-button--danger:not(.is-disabled):not(.is-loading):hover {
  color: #ffffff;
  border-color: #f78989;
  background: #f78989;
}

/* info 按钮 */
.keyment-button--info {
  color: #ffffff;
  border-color: #909399;
  background: #909399;
}

.keyment-button--info:not(.is-disabled):not(.is-loading):hover {
  color: #ffffff;
  border-color: #a6a9ad;
  background: #a6a9ad;
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

/* 默认朴素按钮 */
.keyment-button.is-plain {
  border-color: #dcdfe6;
  background: #ffffff;
  color: #303133;
}
.keyment-button.is-plain:not(.is-disabled):not(.is-loading):hover {
  color: #409eff;
  border-color: #a0cfff;
}
/* primary 朴素按钮 */
.keyment-button--primary.is-plain {
  color: #409eff;
  border-color: #a0cfff;
  background: #ecf5ff;
}

.keyment-button--primary.is-plain:not(.is-disabled):not(.is-loading):hover {
  color: #409eff;
  border-color: #409eff;
  background: #ffffff;
}

/* success 朴素按钮 */
.keyment-button--success.is-plain {
  color: #67c23a;
  border-color: #b3e19d;
  background: #f0f9eb;
}

.keyment-button--success.is-plain:not(.is-disabled):not(.is-loading):hover {
  color: #67c23a;
  border-color: #67c23a;
  background: #ffffff;
}

/* warning 朴素按钮 */
.keyment-button--warning.is-plain {
  color: #e6a23c;
  border-color: #f3d19e;
  background: #fdf6ec;
}

.keyment-button--warning.is-plain:not(.is-disabled):not(.is-loading):hover {
  color: #e6a23c;
  border-color: #e6a23c;
  background: #ffffff;
}

/* danger 朴素按钮 */
.keyment-button--danger.is-plain {
  color: #f56c6c;
  border-color: #fab6b6;
  background: #fef0f0;
}

.keyment-button--danger.is-plain:not(.is-disabled):not(.is-loading):hover {
  color: #f56c6c;
  border-color: #f56c6c;
  background: #ffffff;
}

/* info 朴素按钮 */
.keyment-button--info.is-plain {
  color: #909399;
  border-color: #c8c9cc;
  background: #f4f4f5;
}

.keyment-button--info.is-plain:not(.is-disabled):not(.is-loading):hover {
  color: #909399;
  border-color: #909399;
  background: #ffffff;
}
</style>
