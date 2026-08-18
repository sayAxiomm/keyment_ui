<script setup lang="ts">
import { ref } from "vue";
import { KySwitch } from "@keyment/components";

const enabled = ref(false);
</script>

<template>
  <div class="component-preview__row">
    <KySwitch v-model="enabled" active-text="开" inactive-text="关" />
    <span>当前状态：{{ enabled ? "开启" : "关闭" }}</span>
  </div>
</template>
