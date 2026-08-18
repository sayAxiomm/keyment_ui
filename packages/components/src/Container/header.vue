<template>
  <!--
    Header 是 Container 里的顶部区域。
    里面具体放什么内容，交给默认插槽。
  -->
  <header class="keyment-header" :style="headerStyle">
    <slot />
  </header>
</template>

<script setup lang="ts">
import type { HeaderProps } from "./container";
import { computed } from "vue";

defineOptions({
  name: "KyHeader"
});

// Header 的 height 是可选 props。
// 如果用户不传 height，就默认使用 60px。
const props = withDefaults(defineProps<HeaderProps>(), {
  height: "60px"
});

const headerStyle = computed(() => {
  return {
    height: props.height
  };
});
</script>

<style scoped>
.keyment-header {
  box-sizing: border-box;
  /* 
    Header 在 flex 布局里不应该被压缩。
    不然内容区域变小的时候，Header 的高度可能会被挤掉。
  */
  flex-shrink: 0;
}
</style>
