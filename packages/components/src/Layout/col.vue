<template>
  <!-- 
    tag 决定最终渲染成什么标签。
    默认是 div，例如 <div class="keyment-col">。
  -->
  <component :is="props.tag" class="keyment-col" :class="colClass" :style="colStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import type { ColProps } from "./layout";

defineOptions({
  name: "KyCol"
});

const props = withDefaults(defineProps<ColProps>(), {
  span: 24,
  offset: 0,
  push: 0,
  pull: 0,
  tag: "div"
});

// 从 Row 里拿 gutter。
// 如果这个 Col 外面没有 KyRow，就拿默认值 0。
const gutter = inject("keymentRowGutter", 0);

const colClass = computed(() => [
  `keyment-col-${props.span}`,
  {
    [`keyment-col-offset-${props.offset}`]: props.offset > 0,
    [`keyment-col-push-${props.push}`]: props.push > 0,
    [`keyment-col-pull-${props.pull}`]: props.pull > 0
  }
]);

const colStyle = computed(() => {
  const style: Record<string, string> = {};

  // Row 提供 gutter，Col 用左右 padding 做间距。
  if (gutter) {
    style.paddingLeft = `${gutter / 2}px`;
    style.paddingRight = `${gutter / 2}px`;
  }

  return style;
});
</script>

<style scoped>
.keyment-col {
  box-sizing: border-box;
  min-height: 1px;
}

/* span：一行分成 24 份 */
.keyment-col-0 {
  display: none;
}

.keyment-col-1 {
  flex: 0 0 4.1666666667%;
  max-width: 4.1666666667%;
}

.keyment-col-2 {
  flex: 0 0 8.3333333333%;
  max-width: 8.3333333333%;
}

.keyment-col-3 {
  flex: 0 0 12.5%;
  max-width: 12.5%;
}

.keyment-col-4 {
  flex: 0 0 16.6666666667%;
  max-width: 16.6666666667%;
}

.keyment-col-5 {
  flex: 0 0 20.8333333333%;
  max-width: 20.8333333333%;
}

.keyment-col-6 {
  flex: 0 0 25%;
  max-width: 25%;
}

.keyment-col-7 {
  flex: 0 0 29.1666666667%;
  max-width: 29.1666666667%;
}

.keyment-col-8 {
  flex: 0 0 33.3333333333%;
  max-width: 33.3333333333%;
}

.keyment-col-9 {
  flex: 0 0 37.5%;
  max-width: 37.5%;
}

.keyment-col-10 {
  flex: 0 0 41.6666666667%;
  max-width: 41.6666666667%;
}

.keyment-col-11 {
  flex: 0 0 45.8333333333%;
  max-width: 45.8333333333%;
}

.keyment-col-12 {
  flex: 0 0 50%;
  max-width: 50%;
}

.keyment-col-13 {
  flex: 0 0 54.1666666667%;
  max-width: 54.1666666667%;
}

.keyment-col-14 {
  flex: 0 0 58.3333333333%;
  max-width: 58.3333333333%;
}

.keyment-col-15 {
  flex: 0 0 62.5%;
  max-width: 62.5%;
}

.keyment-col-16 {
  flex: 0 0 66.6666666667%;
  max-width: 66.6666666667%;
}

.keyment-col-17 {
  flex: 0 0 70.8333333333%;
  max-width: 70.8333333333%;
}

.keyment-col-18 {
  flex: 0 0 75%;
  max-width: 75%;
}

.keyment-col-19 {
  flex: 0 0 79.1666666667%;
  max-width: 79.1666666667%;
}

.keyment-col-20 {
  flex: 0 0 83.3333333333%;
  max-width: 83.3333333333%;
}

.keyment-col-21 {
  flex: 0 0 87.5%;
  max-width: 87.5%;
}

.keyment-col-22 {
  flex: 0 0 91.6666666667%;
  max-width: 91.6666666667%;
}

.keyment-col-23 {
  flex: 0 0 95.8333333333%;
  max-width: 95.8333333333%;
}

.keyment-col-24 {
  flex: 0 0 100%;
  max-width: 100%;
}

/* offset：左侧空出几份 */
.keyment-col-offset-1 {
  margin-left: 4.1666666667%;
}

.keyment-col-offset-2 {
  margin-left: 8.3333333333%;
}

.keyment-col-offset-3 {
  margin-left: 12.5%;
}

.keyment-col-offset-4 {
  margin-left: 16.6666666667%;
}

.keyment-col-offset-5 {
  margin-left: 20.8333333333%;
}

.keyment-col-offset-6 {
  margin-left: 25%;
}

.keyment-col-offset-7 {
  margin-left: 29.1666666667%;
}

.keyment-col-offset-8 {
  margin-left: 33.3333333333%;
}

.keyment-col-offset-9 {
  margin-left: 37.5%;
}

.keyment-col-offset-10 {
  margin-left: 41.6666666667%;
}

.keyment-col-offset-11 {
  margin-left: 45.8333333333%;
}

.keyment-col-offset-12 {
  margin-left: 50%;
}

.keyment-col-offset-13 {
  margin-left: 54.1666666667%;
}

.keyment-col-offset-14 {
  margin-left: 58.3333333333%;
}

.keyment-col-offset-15 {
  margin-left: 62.5%;
}

.keyment-col-offset-16 {
  margin-left: 66.6666666667%;
}

.keyment-col-offset-17 {
  margin-left: 70.8333333333%;
}

.keyment-col-offset-18 {
  margin-left: 75%;
}

.keyment-col-offset-19 {
  margin-left: 79.1666666667%;
}

.keyment-col-offset-20 {
  margin-left: 83.3333333333%;
}

.keyment-col-offset-21 {
  margin-left: 87.5%;
}

.keyment-col-offset-22 {
  margin-left: 91.6666666667%;
}

.keyment-col-offset-23 {
  margin-left: 95.8333333333%;
}

.keyment-col-offset-24 {
  margin-left: 100%;
}

/* push / pull：通过相对定位移动 */
[class*="keyment-col-push-"],
[class*="keyment-col-pull-"] {
  position: relative;
}

.keyment-col-push-1 {
  left: 4.1666666667%;
}

.keyment-col-push-2 {
  left: 8.3333333333%;
}

.keyment-col-push-3 {
  left: 12.5%;
}

.keyment-col-push-4 {
  left: 16.6666666667%;
}

.keyment-col-push-5 {
  left: 20.8333333333%;
}

.keyment-col-push-6 {
  left: 25%;
}

.keyment-col-push-7 {
  left: 29.1666666667%;
}

.keyment-col-push-8 {
  left: 33.3333333333%;
}

.keyment-col-push-9 {
  left: 37.5%;
}

.keyment-col-push-10 {
  left: 41.6666666667%;
}

.keyment-col-push-11 {
  left: 45.8333333333%;
}

.keyment-col-push-12 {
  left: 50%;
}

.keyment-col-pull-1 {
  right: 4.1666666667%;
}

.keyment-col-pull-2 {
  right: 8.3333333333%;
}

.keyment-col-pull-3 {
  right: 12.5%;
}

.keyment-col-pull-4 {
  right: 16.6666666667%;
}

.keyment-col-pull-5 {
  right: 20.8333333333%;
}

.keyment-col-pull-6 {
  right: 25%;
}

.keyment-col-pull-7 {
  right: 29.1666666667%;
}

.keyment-col-pull-8 {
  right: 33.3333333333%;
}

.keyment-col-pull-9 {
  right: 37.5%;
}

.keyment-col-pull-10 {
  right: 41.6666666667%;
}

.keyment-col-pull-11 {
  right: 45.8333333333%;
}

.keyment-col-pull-12 {
  right: 50%;
}
</style>