<template>
  <!-- 
    Container 是布局容器，本身不写固定内容。
    slot 用来接收外部传进来的 Header / Aside / Main / Footer。
  -->
  <section class="keyment-container" :class="containerClass">
    <slot />
  </section>
</template>

 <script setup lang="ts">
//  useSlots拿到当前组件接收到的插槽内容。
import { computed ,useSlots} from 'vue';
import type { ContainerProps } from "./container";

// 组件名。以后全局注册后，可以在模板里写 <ky-container>。
defineOptions({
  name:"KyContainer"
})

const slots = useSlots();

// 这里不要用 withDefaults。
// 因为 direction 的默认值不是固定的，而是要根据 slot 里的子组件判断。
// element-plus里面说:子元素中有 el-header 或 el-footer 时为 vertical，否则为 horizontal
const props = defineProps<ContainerProps>();

// 判断默认插槽里是否存在 Header 或 Footer
const hasHeaderOrFooter =computed(()=>{
  const children = slots.default?.() || [];
// some只要数组里有一个元素满足条件，就返回 true
  return children.some((child) => {
    // child.type 表示这个虚拟节点的组件类型。
    // 如果它是 KyHeader，那么 child.type.name 通常就是 "KyHeader"。
    const type = child.type as { name?: string };

    return type.name === "KyHeader" || type.name === "KyFooter";
  });
})

// 真正使用的方向。
// 优先级：用户传入的 props.direction 自动推断的方向。
const direction = computed(() => {
  if (props.direction) {
    return props.direction;
  }

  return hasHeaderOrFooter.value ? "vertical" : "horizontal";
});

// 根据最终 direction 生成 class。
const containerClass = computed(() => {
  return `keyment-container--${direction.value}`;
});
</script>

<style scoped>
  .keyment-container {
  display: flex;
  flex: 1;
  box-sizing: border-box;
  min-width: 0;
}
/* vertical：从上到下排列，比如 Header / Main / Footer */
.keyment-container--vertical {
  flex-direction: column;
}

/* horizontal：从左到右排列，比如 Aside / Main */
.keyment-container--horizontal {
  flex-direction: row;
}
</style>