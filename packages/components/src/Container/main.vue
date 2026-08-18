<template>
  <!-- 
    Main 是主要内容区域。
    页面主体内容会通过默认插槽放进来。
  -->
  <main class="keyment-main">
    <slot />
  </main>
</template>

<script setup lang="ts">
defineOptions({
  // 组件名。以后全局注册后，可以写 <ky-main>。
  name: "KyMain"
});
</script>

<style scoped>
.keyment-main {
  box-sizing: border-box;
  flex: 1;
  /* 
    min-width: 0 可以避免内容太长时把 flex 容器撑破。
    这是写 flex 布局时很常见的保护项。
  */
  min-width: 0;
}
</style>
