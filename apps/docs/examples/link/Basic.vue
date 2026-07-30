<script setup lang="ts">
import { KyLink } from "@keyment/components";
import { Promotion } from "@keyment/icons";
</script>

<template>
  <div class="component-preview__row">
    <KyLink href="#">默认链接</KyLink>
    <KyLink type="primary" href="#">主要链接</KyLink>
    <KyLink type="success" href="#">成功链接</KyLink>
    <KyLink type="warning" :icon="Promotion" href="#">带图标链接</KyLink>
    <KyLink type="danger" disabled>禁用链接</KyLink>
  </div>
</template>
