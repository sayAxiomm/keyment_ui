<template>
  <div v-show="isActive" class="keyment-tab-pane">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted } from "vue";
import type { TabPaneContext, TabPaneProps, TabsContext } from "./tabs";

defineOptions({
  name: "KyTabPane"
});

const props = withDefaults(defineProps<TabPaneProps>(), {
  label: "",
  disabled: false
});

const tabs = inject<TabsContext>("tabs");

// 当前 pane 的唯一 name。
// 如果用户没传 name，就先用 label 顶一下。
const paneName = computed(() => {
  return props.name ?? props.label;
});

// 当前 tab-pane 注册给 tabs 的信息。
const pane = computed<TabPaneContext>(() => {
  return {
    label: props.label,
    name: paneName.value,
    disabled: props.disabled
  };
});

// 当前 pane 是否是激活状态。
const isActive = computed(() => {
  return tabs?.activeName === pane.value.name;
});

onMounted(() => {
  tabs?.addPane(pane.value);
});

onBeforeUnmount(() => {
  tabs?.removePane(pane.value.name);
});
</script>

<style scoped>
.keyment-tab-pane {
  color: #303133;
}
</style>
