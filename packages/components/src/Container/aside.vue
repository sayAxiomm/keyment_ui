<template>
  <!-- 
    Aside 是 Container 里的侧边栏区域。
    里面具体放什么内容，交给默认插槽。
  -->
  <aside class="keyment-aside" :style="asideStyle">
    <slot />
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { AsideProps } from "./container";

defineOptions({
  // 组件名。以后全局注册后，可以写 <ky-aside>。
  name: "KyAside"
});

// Aside 的 width 是可选 props。
// 如果用户不传 width，就默认使用 300px。
const props = withDefaults(defineProps<AsideProps>(), {
  width: "300px"
});

// 把 props.width 转成真正的 CSS style。
// 比如用户写 <ky-aside width="200px" />
// 最终会生成 style="width: 200px;"
const asideStyle = computed(() => {
  return {
    width: props.width
  };
});
</script>

<style scoped>
.keyment-aside {
  box-sizing: border-box;

  /* 
    Aside 在 flex 横向布局里通常不应该被压缩。
    不然主内容区变小时，侧边栏宽度会被挤掉。
  */
  flex-shrink: 0;
}
</style>