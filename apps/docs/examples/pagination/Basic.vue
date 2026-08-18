<script setup lang="ts">
import { ref } from "vue";
import { KyPagination } from "@keyment/components";

const currentPage = ref(1);
</script>

<template>
  <div class="component-preview__column">
    <KyPagination v-model:current-page="currentPage" :total="100" :page-size="10" />
    <KyPagination background :total="100" :page-size="10" size="small" />
    <span>当前页：{{ currentPage }}</span>
  </div>
</template>
