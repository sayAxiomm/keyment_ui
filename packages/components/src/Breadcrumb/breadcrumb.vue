<template>
  <!-- 面包屑最外层容器 -->
  <nav class="keyment-breadcrumb">
    <slot />
  </nav>
</template>

<script setup lang="ts">
import { provide } from "vue";
import type { BreadcrumbContext, BreadcrumbProps } from "./breadcrumb";

defineOptions({
  name: "KyBreadcrumb"
});

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: "/"
});

// 把 separator 提供给下面的 ky-breadcrumb-item。
// 这样用户只需要在 ky-breadcrumb 上写一次 separator。
provide<BreadcrumbContext>("breadcrumb", {
  get separator() {
    return props.separator;
  }
});
</script>

<style scoped>
.keyment-breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #606266;
}
</style>
