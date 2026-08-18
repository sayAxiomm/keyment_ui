<script setup lang="ts">
import { ref } from "vue";
import { KyRadio, KyRadioButton, KyRadioGroup } from "@keyment/components";

const city = ref("shanghai");
const size = ref("medium");
</script>

<template>
  <div class="component-preview__column">
    <KyRadioGroup v-model="city">
      <KyRadio value="beijing">北京</KyRadio>
      <KyRadio value="shanghai">上海</KyRadio>
      <KyRadio value="guangzhou">广州</KyRadio>
    </KyRadioGroup>

    <KyRadioGroup v-model="size" fill="#67c23a">
      <KyRadioButton value="small">小型</KyRadioButton>
      <KyRadioButton value="medium">中型</KyRadioButton>
      <KyRadioButton value="large">大型</KyRadioButton>
    </KyRadioGroup>

    <span>当前选择：{{ city }} / {{ size }}</span>
  </div>
</template>
