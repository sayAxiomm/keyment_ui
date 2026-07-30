<script setup lang="ts">
import { KyIcon } from "@keyment/components";
import { Check, Plus, Search, Setting } from "@keyment/icons";
</script>

<template>
  <div class="component-preview__row">
    <KyIcon :size="24"><Plus /></KyIcon>
    <KyIcon :size="28" color="#409eff"><Search /></KyIcon>
    <KyIcon :size="32" color="#67c23a"><Check /></KyIcon>
    <KyIcon size="2rem" color="#e6a23c"><Setting /></KyIcon>
  </div>
</template>
