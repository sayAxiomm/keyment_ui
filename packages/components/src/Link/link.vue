<template>
  <!-- 
    Link 本质是文字链接，所以底层使用 a 标签。
    href / target 都是 a 标签原生支持的属性。
  -->
  <a
    class="keyment-link"
    :class="linkClass"
    :href="disabled ? undefined : href"
    :target="disabled ? undefined : target"
    @click="handleClick"
  >
    <!-- 如果传入 icon，就渲染链接图标 -->
    <KyIcon v-if="icon" class="keyment-link__icon">
      <component :is="icon" />
    </KyIcon>

    <!-- 默认插槽是链接文字 -->
    <span v-if="$slots.default" class="keyment-link__text">
      <slot />
    </span>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { KyIcon } from "../icon";
import type { LinkProps } from "./link";

defineOptions({
  // 组件名。以后可以写 <ky-link>。
  name: "KyLink"
});

const props = withDefaults(defineProps<LinkProps>(), {
  type: "default",
  disabled: false,
  underline: true
});

// script 里使用 props 时，可以 props.xxx。
// 但 template 里 props 会自动展开，所以可以直接写 disabled / href / icon。
// 第一个 class 永远要加
// 后面两个 class 根据 true/false 决定加不加[]
const linkClass = computed(() => [
  `keyment-link--${props.type}`,
  {
    "is-disabled": props.disabled,
    "is-underline": props.underline
  }
]);

const handleClick = (event: MouseEvent) => {
  // disabled 时，阻止 a 标签跳转，也阻止事件继续触发。
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
  }
};
</script>

<style scoped>
.keyment-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #606266;
  font-size: 14px;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  outline: none;
}

.keyment-link.is-underline:hover {
  text-decoration: underline;
}

.keyment-link.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.keyment-link.is-disabled:hover {
  text-decoration: none;
}

.keyment-link__icon {
  font-size: 1em;
  flex-shrink: 0;
}

.keyment-link__icon + .keyment-link__text {
  margin-left: 6px;
}

.keyment-link__text {
  display: inline-flex;
  align-items: center;
}

.keyment-link--primary {
  color: #409eff;
}

.keyment-link--success {
  color: #67c23a;
}

.keyment-link--warning {
  color: #e6a23c;
}

.keyment-link--danger {
  color: #f56c6c;
}

.keyment-link--info {
  color: #909399;
}
</style>