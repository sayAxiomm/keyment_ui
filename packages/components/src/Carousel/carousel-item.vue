<template>
  <div
    v-show="isActive"
    class="keyment-carousel-item"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
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

// 当前 item 是否是正在显示的那一张。
// carousel.activeIndex 是父组件当前激活索引。
// index.value 是当前 item 自己的索引。
const isActive = computed(() => {
  return carousel?.activeIndex === index.value;
});
</script>

<style scoped>
.keyment-carousel-item {
  width: 100%;
  height: 100%;
}
</style>