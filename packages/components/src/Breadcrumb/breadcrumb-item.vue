<template>
  <span class="keyment-breadcrumb-item">
    <span
      class="keyment-breadcrumb-item__inner"
      :class="{ 'is-link': isLink }"
      @click="handleClick"
    >
      <slot />
    </span>

    <span class="keyment-breadcrumb-item__separator">
      {{ breadcrumb?.separator }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import type { BreadcrumbContext, BreadcrumbItemProps } from "./breadcrumb";

defineOptions({
  name: "KyBreadcrumbItem"
});
const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
  replace: false
});

const isLink = computed(() => {
  return Boolean(props.to);
});
const handleClick = () => {
  if (!props.to) {
    return;
  }

  if (props.replace) {
    window.location.replace(props.to);
    return;
  }

  window.location.href = props.to;
};
// 从父组件 KyBreadcrumb 拿到 separator。
const breadcrumb = inject<BreadcrumbContext>("breadcrumb");
</script>
<style scoped>
.keyment-breadcrumb-item {
  display: inline-flex;
  align-items: center;
}

.keyment-breadcrumb-item__inner {
  color: #606266;
}

.keyment-breadcrumb-item__separator {
  margin: 0 8px;
  color: #c0c4cc;
}
.keyment-breadcrumb-item:last-child .keyment-breadcrumb-item__separator {
  display: none;
}
.keyment-breadcrumb-item__inner.is-link {
  font-weight: 700;
  cursor: pointer;
}

.keyment-breadcrumb-item__inner.is-link:hover {
  color: #409eff;
}
</style>
