<script setup lang="ts">
import { computed, watch } from "vue";
import type { DialogEmits, DialogProps } from "./dialog";

defineOptions({
  name: "KyDialog"
});

const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: false,
  title: "",
  width: "50%",
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true
});

const emit = defineEmits<DialogEmits>();

// 对话框主体样式。
// width 由用户传入，比如 "500px"、"50%"。
const dialogStyle = computed(() => {
  return {
    width: props.width
  };
});

// 关闭对话框。
// Dialog 自己不直接改 props.modelValue，而是通知父组件改。
const closeDialog = () => {
  emit("update:modelValue", false);
  emit("close");
};

// 点击遮罩层时关闭。
const handleModalClick = () => {
  if (!props.closeOnClickModal) {
    return;
  }

  closeDialog();
};

// 监听显示状态变化，打开时触发 open。
watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      emit("open");
    }
  }
);
</script>