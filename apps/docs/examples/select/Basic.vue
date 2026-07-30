<script setup lang="ts">
import { ref } from "vue";
import { KyOption, KySelect } from "@keyment/components";

const city = ref("");
const cities = ref<string[]>([]);
</script>

<template>
  <div class="component-preview__column select-demo">
    <KySelect v-model="city" clearable placeholder="请选择城市">
      <KyOption label="北京" value="beijing" />
      <KyOption label="上海" value="shanghai" />
      <KyOption label="广州" value="guangzhou" />
    </KySelect>

    <KySelect v-model="cities" multiple clearable placeholder="请选择多个城市">
      <KyOption label="北京" value="beijing" />
      <KyOption label="上海" value="shanghai" />
      <KyOption label="广州" value="guangzhou" />
    </KySelect>
  </div>
</template>

<style scoped>
.select-demo {
  max-width: 360px;
}
</style>
