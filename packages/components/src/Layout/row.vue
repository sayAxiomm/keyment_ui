<template>
  <!-- 
    component 是 Vue 的动态标签。
    :is=props.tag 是什么，这里就渲染成什么标签。
    默认 tag 是 div，所以默认就是 <div class="keyment-row">。
      style 适合控制“用户传进来的动态数值”,这个值理论上有无限种，不适合给每个值都写 class：
  -->
  <component :is="props.tag" class="keyment-row" :class="rowClass" :style="rowStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import type { RowProps } from "./layout";

defineOptions({
  name: "KyRow"
});

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: "start",
  align: "top",
  tag: "div"
});

// provide 的作用：父组件 Row 把 gutter 提供给子组件 Col。
// 后面 col.vue 里会用 inject 接收这个值。
// 这样用户只需要在 Row 上写 :gutter="20"，不用每个 Col 都传。
provide("keymentRowGutter", props.gutter);

const rowClass = computed(() => [
  `is-justify-${props.justify}`,
  `is-align-${props.align}`
]);

const rowStyle = computed(() => {
  const style: Record<string, string> = {};

  // gutter 是列之间的间距。
  // Row 用负 margin 抵消 Col 的左右 padding。
  // 例如 gutter=20，则 Col 左右各 padding 10px，Row 左右各 margin -10px。
  if (props.gutter) {
    style.marginLeft = `-${props.gutter / 2}px`;
    style.marginRight = `-${props.gutter / 2}px`;
  }

  return style;
});
</script>

<style scoped>
.keyment-row {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}

/* justify 控制主轴，也就是水平方向排列 */
.keyment-row.is-justify-start {
  justify-content: flex-start;
}

.keyment-row.is-justify-end {
  justify-content: flex-end;
}

.keyment-row.is-justify-center {
  justify-content: center;
}

.keyment-row.is-justify-space-around {
  justify-content: space-around;
}

.keyment-row.is-justify-space-between {
  justify-content: space-between;
}

.keyment-row.is-justify-space-evenly {
  justify-content: space-evenly;
}

/* align 控制交叉轴，也就是垂直方向对齐 */
.keyment-row.is-align-top {
  align-items: flex-start;
}

.keyment-row.is-align-middle {
  align-items: center;
}

.keyment-row.is-align-bottom {
  align-items: flex-end;
}
</style>