<template>
  <div class="keyment-carousel-item" :style="itemStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, type CSSProperties } from "vue";
import type { CarouselContext } from "./carousel";

defineOptions({
  name: "KyCarouselItem"
});

// 拿到父组件 KyCarousel provide 下来的数据。
// 如果这个组件没有放在 ky-carousel 里面，carousel 就会是 undefined。
const carousel = inject<CarouselContext>("carousel");

// 当前 item 自己的索引。
// 比如第一个 item 是 0，第二个 item 是 1。
const index = ref(0);

// 如果拿到了父级 carousel，就调用 addItem 注册自己。
// addItem 会返回当前 item 的编号。
if (carousel) {
  index.value = carousel.addItem();
}
onBeforeUnmount(() => {
  carousel?.removeItem();
});

// 每个 item 根据自己的索引，计算自己应该在当前页的左边、当前页、还是右边。
// 例如 activeIndex 是 1：
// 第 0 个 item 的 offset 是 -1，所以移动到左边。
// 第 1 个 item 的 offset 是 0，所以显示在中间。
// 第 2 个 item 的 offset 是 1，所以移动到右边。
const itemStyle = computed<CSSProperties>(() => {
  const activeIndex = carousel?.activeIndex ?? 0;
  const previousIndex = carousel?.previousIndex ?? activeIndex;
  const itemCount = carousel?.itemCount ?? 0;
  let offset = index.value - activeIndex;
  const shouldAnimate = index.value === activeIndex || index.value === previousIndex;

  // 当前是最后一张，并且当前这个 item 是第一张。
  // 这样从最后一张切到第一张时，第一张会从右边进来。
  if (itemCount > 1 && activeIndex === itemCount - 1 && index.value === 0) {
    offset = 1;
  }

  // 当前是第一张，并且当前这个 item 是最后一张。
  // 这样从第一张切到最后一张时，最后一张会从左边进来。
  if (itemCount > 1 && activeIndex === 0 && index.value === itemCount - 1) {
    offset = -1;
  }

  return {
    transform: `translateX(${offset * 100}%)`,
    transition: shouldAnimate ? "transform 0.35s ease" : "none",
    visibility: shouldAnimate ? "visible" : "hidden"
  };
});
</script>

<style scoped>
.keyment-carousel-item {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
