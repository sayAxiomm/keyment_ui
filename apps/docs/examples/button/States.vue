<script setup lang="ts">
import { KyButton } from "@keyment/components";
</script>

<template>
  <div class="component-preview__row">
    <KyButton type="primary" plain>朴素按钮</KyButton>
    <KyButton type="primary" round>圆角按钮</KyButton>
    <KyButton type="primary" disabled>禁用按钮</KyButton>
    <KyButton size="small">小型按钮</KyButton>
    <KyButton size="large">大型按钮</KyButton>
  </div>
</template>
