<script setup lang="ts">
import { KyButton, KyButtonGroup } from "@keyment/components";
</script>

<template>
  <div class="component-preview__row">
    <KyButtonGroup>
      <KyButton>上一页</KyButton>
      <KyButton type="primary">当前页</KyButton>
      <KyButton>下一页</KyButton>
    </KyButtonGroup>

    <KyButtonGroup direction="vertical">
      <KyButton>上</KyButton>
      <KyButton>中</KyButton>
      <KyButton>下</KyButton>
    </KyButtonGroup>
  </div>
</template>
