<template>
  <div
    class="keyment-message"
    :class="`keyment-message--${props.type}`"
  >
    <span class="keyment-message__content">
      {{ props.message }}
    </span>

    <button
      v-if="props.showClose"
      class="keyment-message__close"
      type="button"
      @click="handleClose"
     > 
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import type { MessageProps } from "./message";

defineOptions({
  name: "KyMessage"
});

const props = withDefaults(defineProps<MessageProps>(), {
  message: "",
  type: "info",
  duration: 3000,
  showClose: false
});

// 先留一个关闭函数。
// 后面 method.ts 创建 Message 时，会把真正的关闭逻辑接进来。
const handleClose = () => {};
</script>

<style scoped>
.keyment-message {
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: 3000;
  display: flex;
  align-items: center;
  min-width: 300px;
  padding: 12px 16px;
  border-radius: 4px;
  transform: translateX(-50%);
  box-sizing: border-box;
}

.keyment-message--info {
  background: #f4f4f5;
  color: #909399;
}

.keyment-message--success {
  background: #f0f9eb;
  color: #67c23a;
}

.keyment-message--warning {
  background: #fdf6ec;
  color: #e6a23c;
}

.keyment-message--error {
  background: #fef0f0;
  color: #f56c6c;
}

.keyment-message__content {
  flex: 1;
}

.keyment-message__close {
  margin-left: 12px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
}
</style>