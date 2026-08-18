<template>
  <transition name="keyment-backtop-fade">
    <!-- 滚动高度超过 visibilityHeight 时才显示 -->
    <div v-show="isVisible" class="keyment-backtop" :style="backtopStyle" @click="handleClick">
      <slot> ↑ </slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { BacktopEmits, BacktopProps } from "./backtop";

defineOptions({
  name: "KyBacktop"
});

const props = withDefaults(defineProps<BacktopProps>(), {
  visibilityHeight: 200,
  right: 40,
  bottom: 40
});

const emit = defineEmits<BacktopEmits>();

// 是否显示回到顶部按钮。
const isVisible = ref(false);

// 按钮的位置样式。
const backtopStyle = computed(() => {
  return {
    right: `${props.right}px`,
    bottom: `${props.bottom}px`
  };
});

// 获取当前页面滚动高度。
const getScrollTop = () => {
  return window.scrollY;
};

// 滚动时触发。
// 当滚动高度大于 visibilityHeight 时，显示按钮。
const handleScroll = () => {
  isVisible.value = getScrollTop() >= props.visibilityHeight;
};

// 点击按钮后回到页面顶部。
const handleClick = (event: MouseEvent) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  emit("click", event);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style scoped>
.keyment-backtop {
  position: fixed;
  z-index: 1000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  color: #409eff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  font-weight: 700;
}

.keyment-backtop:hover {
  background: #f2f6fc;
}

.keyment-backtop-fade-enter-active,
.keyment-backtop-fade-leave-active {
  transition: opacity 0.3s ease;
}

.keyment-backtop-fade-enter-from,
.keyment-backtop-fade-leave-to {
  opacity: 0;
}
</style>
