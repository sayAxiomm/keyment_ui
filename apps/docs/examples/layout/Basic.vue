<script setup lang="ts">
import { KyCol, KyRow } from "@keyment/components";
</script>

<template>
  <div class="layout-demo">
    <KyRow :gutter="12">
      <KyCol :span="8"><div class="grid-cell">8</div></KyCol>
      <KyCol :span="8"><div class="grid-cell grid-cell--light">8</div></KyCol>
      <KyCol :span="8"><div class="grid-cell">8</div></KyCol>
    </KyRow>
    <KyRow :gutter="12">
      <KyCol :span="6"><div class="grid-cell">6</div></KyCol>
      <KyCol :span="12"><div class="grid-cell grid-cell--light">12</div></KyCol>
      <KyCol :span="6"><div class="grid-cell">6</div></KyCol>
    </KyRow>
  </div>
</template>

<style scoped>
.layout-demo {
  display: grid;
  gap: 12px;
}

.grid-cell {
  padding: 12px 0;
  color: #fff;
  text-align: center;
  background: #409eff;
  border-radius: 4px;
}

.grid-cell--light {
  background: #79bbff;
}
</style>
