<script setup lang="ts">
import { KyBacktop } from "@keyment/components";
</script>

<template>
  <div>
    向下滚动页面，右下角会显示回到顶部按钮。
    <KyBacktop :visibility-height="120" :right="32" :bottom="32"> ↑ </KyBacktop>
  </div>
</template>
