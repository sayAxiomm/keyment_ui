<template>
  <!-- 如果 iconStyle 的值是
   {
    fontSize: "20px",
    color: "red"
  }
  Vue 会把这个对象转换成真实 DOM 的 style： -->
<i style="font-size: 20px; color: red;"></i>

  <i class="keyment-icon" :style="iconStyle" v-bind="$attrs">
    <slot />
  </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IconProps } from "./icon";

defineOptions({
  // 组件名使用 PascalCase，模板里可以写 <ky-icon>
  name: "KyIcon"
});
  // 没有默认值 会继承环境父级的颜色
const props = defineProps<IconProps>();

const iconStyle = computed(() => {
  const style: Record<string, string> = {};

  // size 是数字时自动补 px；字符串时原样使用，例如 "1em" / "20px"
  if (props.size !== undefined) {
    style.fontSize = typeof props.size === "number" ? `${props.size}px` : props.size;
  }

  // color 通过 currentColor 影响内部 svg
  if (props.color) {
    style.color = props.color;
  }

  return style;
});
</script>

<style scoped>
.keyment-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
  color: inherit;
}

.keyment-icon :deep(svg) {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>