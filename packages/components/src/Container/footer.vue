<template>
  <!-- 
    Footer 是 Container 里的底部区域。
    底部具体显示什么内容，交给默认插槽。
  -->
  <footer class="keyment-footer" :style="footerStyle">
    <slot />
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { FooterProps } from "./container";

defineOptions({
  // 组件名。以后全局注册后，可以写 <ky-footer>。
  name: "KyFooter"
});

// Footer 的 height 是可选 props。
// 如果用户不传 height，就默认使用 60px。
const props = withDefaults(defineProps<FooterProps>(), {
  height: "60px"
});

// 把 props.height 转成真正的 CSS style。
// 比如用户写 <ky-footer height="40px" />
// 最终会生成 style="height: 40px;"
const footerStyle = computed(() => {
  return {
    height: props.height
  };
});
</script>

<style scoped>
.keyment-footer {
  box-sizing: border-box;

  /* 
    Footer 在 flex 布局里不应该被压缩。
    内容区域不足时，应该优先压缩 Main，而不是压缩 Footer。
  */
  flex-shrink: 0;
}
</style>