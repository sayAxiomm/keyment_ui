<script setup lang="ts">
import { ref } from "vue";
import { KyDatePicker } from "@keyment/components";

const date = ref("");
const range = ref<[string, string]>(["", ""]);
</script>

<template>
  <div class="component-preview__column date-picker-demo">
    <KyDatePicker
      v-model="date"
      clearable
      placeholder="请选择日期"
    />
    <KyDatePicker
      v-model="range"
      type="daterange"
      clearable
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>

<style scoped>
.date-picker-demo {
  max-width: 520px;
}
</style>
