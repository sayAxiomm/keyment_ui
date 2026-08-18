<script setup lang="ts">
import { ref } from "vue";
import { KyInput } from "@keyment/components";

const value = ref("");
const password = ref("");
</script>

<template>
  <div class="input-examples">
    <KyInput v-model="value" clearable show-word-limit :maxlength="20" placeholder="请输入内容" />
    <KyInput v-model="password" type="password" clearable show-password placeholder="请输入密码" />
    <p>当前输入：{{ value || "暂无内容" }}</p>
  </div>
</template>

<style scoped>
.input-examples {
  display: grid;
  gap: 12px;
  max-width: 360px;
}

.input-examples p {
  margin: 0;
  color: var(--vp-c-text-2);
}
</style>
