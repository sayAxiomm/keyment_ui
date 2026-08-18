<template>
  <div class="keyment-tabs">
    <!-- tab 头部区域：根据 panes 渲染每一个 tab 标题 -->
    <div class="keyment-tabs__header">
      <div
        v-for="pane in panes"
        :key="pane.name"
        class="keyment-tabs__item"
        :class="{
          'is-active': activeName === pane.name,
          'is-disabled': pane.disabled
        }"
        @click="handleTabClick(pane)"
      >
        {{ pane.label }}
      </div>
    </div>

    <!-- tab 内容区域：真正的内容来自 tab-pane 的 slot -->
    <div class="keyment-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import type { TabName, TabPaneContext, TabsContext, TabsEmits, TabsProps } from "./tabs";

defineOptions({
  name: "KyTabs"
});

const props = defineProps<TabsProps>();
const emit = defineEmits<TabsEmits>();

// 存所有注册进来的 tab-pane。
const panes = ref<TabPaneContext[]>([]);

// 当前激活的 tab。
// 如果外部传了 v-model，就以 modelValue 为初始值。
const innerActiveName = ref<TabName | undefined>(props.modelValue);

// 真正用于显示的 activeName。
// 后面 tab-pane 会通过 inject 拿到它。
const activeName = computed(() => {
  return innerActiveName.value;
});

// 子组件 tab-pane 挂载时调用，注册自己。
const addPane = (pane: TabPaneContext) => {
  const exists = panes.value.some((item) => item.name === pane.name);

  if (exists) {
    return;
  }

  panes.value.push(pane);

  // 如果一开始没有激活项，就默认激活第一个 pane。
  if (innerActiveName.value === undefined) {
    innerActiveName.value = pane.name;
  }
};

// 子组件 tab-pane 卸载时调用，移除自己。
const removePane = (name: TabName) => {
  panes.value = panes.value.filter((pane) => pane.name !== name);
};

// 点击 tab 头部时切换。
const handleTabClick = (pane: TabPaneContext) => {
  if (pane.disabled) {
    return;
  }

  innerActiveName.value = pane.name;

  emit("update:modelValue", pane.name);
  emit("tab-click", pane.name);
};

// 外部 v-model 变化时，同步内部 active。
watch(
  () => props.modelValue,
  (value) => {
    innerActiveName.value = value;
  }
);

// 提供给 tab-pane 使用。
provide<TabsContext>("tabs", {
  get activeName() {
    return activeName.value;
  },
  addPane,
  removePane
});
</script>
<style scoped>
.keyment-tabs {
  width: 100%;
}

.keyment-tabs__header {
  display: flex;
  border-bottom: 1px solid #dcdfe6;
}

.keyment-tabs__item {
  position: relative;
  padding: 0 20px;
  color: #606266;
  font-size: 14px;
  line-height: 40px;
  cursor: pointer;
}

.keyment-tabs__item:hover {
  color: #409eff;
}

.keyment-tabs__item.is-active {
  color: #409eff;
}

.keyment-tabs__item.is-active::after {
  content: "";
  position: absolute;
  right: 20px;
  bottom: -1px;
  left: 20px;
  height: 2px;
  background: #409eff;
}

.keyment-tabs__item.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.keyment-tabs__item.is-disabled:hover {
  color: #c0c4cc;
}

.keyment-tabs__content {
  padding: 16px 0;
}
</style>
