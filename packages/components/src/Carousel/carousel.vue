<template>
  <!-- 外层容器 -->
  <div
    class="keyment-carousel"
    :style="carouselStyle"
    >
    <!-- 外层容器 -->
    <div class="keyment-carousel__container">
      <slot />
    </div>

    <button
      v-if="props.arrow !== 'never'"
      class="keyment-carousel__arrow keyment-carousel__arrow--left"
      type="button"
      @click="prev"
    >
      &lt;
    </button>

    <button
      v-if="props.arrow !== 'never'"
      class="keyment-carousel__arrow keyment-carousel__arrow--right"
      type="button"
      @click="next"
    >
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from "vue";
import type { CarouselContext, CarouselEmits, CarouselProps } from "./carousel";

defineOptions({
  name: "KyCarousel"
});

const props = withDefaults(defineProps<CarouselProps>(), {
  height: "300px",
  initialIndex: 0,
  autoplay: true,
  interval: 3000,
  loop: true,
  arrow: "hover",
  indicatorPosition: "inside"
});

const emit = defineEmits<CarouselEmits>();

const activeIndex = ref(props.initialIndex); // 当前正在显示第几张

// 当前 carousel 里面一共有多少个 carousel-item。
// 每个 carousel-item 挂载时都会调用 addItem，让这里数量 +1。
const itemCount = ref(0);


// 外层轮播容器的动态样式。
const carouselStyle = computed(() => {
  return {
    height: props.height
  };
});

// 子组件 carousel-item 注册自己的函数。
// 每个 item 调用一次，就会拿到一个自己的 index。
const addItem = () => {
  const index = itemCount.value;

  itemCount.value += 1;

  return index;
};

// 切换当前显示的轮播项。
const setActiveItem = (index: number) => {
  const prevIndex = activeIndex.value;

  activeIndex.value = index;

  emit("change", index, prevIndex);
};

const prev = () => {
  setActiveItem(activeIndex.value - 1);
};

const next = () => {
  setActiveItem(activeIndex.value + 1);
};

provide<CarouselContext>("carousel", {
  get activeIndex() {
    return activeIndex.value;
  },
  addItem
});
</script>

<style scoped>
.keyment-carousel {
  position: relative;
  overflow: hidden;
}

.keyment-carousel__container {
  position: relative;
  width: 100%;
  height: 100%;
}

.keyment-carousel__arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(31, 45, 61, 0.35);
  color: #ffffff;
  cursor: pointer;
  transform: translateY(-50%);
}

.keyment-carousel__arrow--left {
  left: 16px;
}

.keyment-carousel__arrow--right {
  right: 16px;
}
</style>