<template>
  <!-- 外层容器 -->
  <div
    class="keyment-carousel"
    :style="carouselStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    >
    <!-- 外层容器 -->
    <div class="keyment-carousel__container">
      <slot />
    </div>

    <button
      v-if="showArrows"
      class="keyment-carousel__arrow keyment-carousel__arrow--left"
      type="button"
      @click="prev"
    >
      &lt;
    </button>

    <button
      v-if="showArrows"
      class="keyment-carousel__arrow keyment-carousel__arrow--right"
      type="button"
      @click="next"
    >
      &gt;
    </button>

    <div
      v-if="props.indicatorPosition !== 'none'"
      class="keyment-carousel__indicators"
      >
      <button
        v-for="index in itemCount"
        :key="index"
        class="keyment-carousel__indicator"
        :class="{ 'is-active': activeIndex === index - 1 }"
        type="button"
        @click="setActiveItem(index - 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref , onBeforeUnmount, onMounted} from "vue";
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
   
let timer: ReturnType<typeof setInterval> | undefined;
const isHovering = ref(false);  // 是否hover
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
  if (itemCount.value === 0) {
    return;
  }
// 这一段决定 点击之后跳到哪一页
  // 先假设你传进来的 index 就是最终要切换到的索引。
  let nextIndex = index;

  if (index < 0) {
    nextIndex = props.loop ? itemCount.value - 1 : 0;
  }

  if (index >= itemCount.value) {
    nextIndex = props.loop ? 0 : itemCount.value - 1;
  }
// 决定跳不跳
  // 记录切换前是哪一张。
  const prevIndex = activeIndex.value;

  if (nextIndex === prevIndex) {
    return;
  }

  activeIndex.value = nextIndex;

  emit("change", nextIndex, prevIndex);
};

// 只负责表达意图
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

// 自动播放
const startTimer = () => {
  if (!props.autoplay) {
    return;
  }

  stopTimer();

  timer = setInterval(() => {
    next();
  }, props.interval);
};

const stopTimer = () => {
  if (!timer) {
    return;
  }

  clearInterval(timer);
  timer = undefined;
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  stopTimer();
});

// 鼠标进入调用
const handleMouseEnter = () => {
  isHovering.value = true;
  stopTimer();
};
// 鼠标离开调用
const handleMouseLeave = () => {
  isHovering.value = false;
  startTimer();
};

const showArrows = computed(() => {
  if (props.arrow === "never") {
    return false;
  }

  if (props.arrow === "always") {
    return true;
  }

  return isHovering.value;
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
.keyment-carousel__indicators {
  position: absolute;
  left: 50%;
  bottom: 12px;
  z-index: 2;
  display: flex;
  gap: 8px;
  transform: translateX(-50%);
}
.keyment-carousel__indicator {
  width: 30px;
  height: 2px;
  padding: 0;
  border: none;
  background: rgba(255, 255, 255, 0.48);
  cursor: pointer;
}

.keyment-carousel__indicator.is-active {
  background: #ffffff;
}
</style>