<template>
  <transition name="keyment-dialog-fade">
    <!-- modelValue 为 true 时显示遮罩和弹窗 -->
    <div
      v-show="props.modelValue"
      class="keyment-dialog__overlay"
      @click="handleModalClick"
    >
      <!-- @click.stop 阻止点击弹窗内容时冒泡到遮罩层 -->
      <div
        class="keyment-dialog"
        :style="dialogStyle"
        @click.stop
      >
        <!-- 头部：标题 + 关闭按钮 -->
        <div class="keyment-dialog__header">
          <span class="keyment-dialog__title">
            {{ props.title }}
          </span>

          <button
            v-if="props.showClose"
            class="keyment-dialog__close"
            type="button"
            @click="closeDialog"
          >
            ×
          </button>
        </div>

        <!-- 内容区域 -->
        <div class="keyment-dialog__body">
          <slot />
        </div>

        <!-- 底部按钮区域，用户可以自己传 footer 插槽 -->
        <div class="keyment-dialog__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
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

// 按下 ESC 时关闭对话框。
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.closeOnPressEscape) {
    return;
  }

  if (!props.modelValue) {
    return;
  }

  if (event.key === "Escape") {
    closeDialog();
  }
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

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.keyment-dialog__overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.keyment-dialog {
  box-sizing: border-box;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
}

.keyment-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 10px;
}

.keyment-dialog__title {
  color: #303133;
  font-size: 16px;
  font-weight: 500;
}

.keyment-dialog__close {
  border: none;
  background: transparent;
  color: #909399;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
}

.keyment-dialog__close:hover {
  color: #409eff;
}

.keyment-dialog__body {
  padding: 20px;
  color: #606266;
  font-size: 14px;
}

.keyment-dialog__footer {
  padding: 10px 20px 20px;
  text-align: right;
}

.keyment-dialog-fade-enter-active,
.keyment-dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.keyment-dialog-fade-enter-from,
.keyment-dialog-fade-leave-to {
  opacity: 0;
}
</style>