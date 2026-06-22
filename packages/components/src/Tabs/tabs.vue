<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import type {
  TabName,
  TabPaneContext,
  TabsContext,
  TabsEmits,
  TabsProps
} from "./tabs";

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