<template>
  <div class="keyment-button-group" :class="`keyment-button-group--${props.direction}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ButtonGroupProps } from "./button-group";
defineOptions({
  // 组件名使用 PascalCase，模板里可以写 <ky-button-group>
  name: "KyButtonGroup"
});
// 定义button-group的props的类型
const props = withDefaults(defineProps<ButtonGroupProps>(), {
  direction: "horizontal"
});
</script>

<style scoped>
.keyment-button-group {
  display: inline-flex;
  vertical-align: middle;
}
.keyment-button-group--horizontal {
  flex-direction: row;
}

.keyment-button-group--vertical {
  flex-direction: column;
}
/* 横向时，所有按钮先去掉圆角 */
.keyment-button-group--horizontal :deep(.keyment-button) {
  border-radius: 0;
}
/* 第一个按钮保留左侧圆角 */
.keyment-button-group--horizontal :deep(.keyment-button:first-child) {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

/* 最后一个按钮保留右侧圆角 */
.keyment-button-group--horizontal :deep(.keyment-button:last-child) {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
/* 纵向时，所有按钮先去掉圆角 */
.keyment-button-group--vertical :deep(.keyment-button) {
  border-radius: 0;
}
/* 第一个按钮保留上方圆角 */
.keyment-button-group--vertical :deep(.keyment-button:first-child) {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

/* 最后一个按钮保留下方圆角 */
.keyment-button-group--vertical :deep(.keyment-button:last-child) {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
