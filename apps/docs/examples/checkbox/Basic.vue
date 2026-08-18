<script setup lang="ts">
import { ref } from "vue";
import { KyCheckbox, KyCheckboxButton, KyCheckboxGroup } from "@keyment/components";

const agreement = ref(false);
const hobbies = ref(["music"]);
</script>

<template>
  <div class="component-preview__column">
    <KyCheckbox v-model="agreement">同意用户协议</KyCheckbox>

    <KyCheckboxGroup v-model="hobbies" :min="1" :max="2">
      <KyCheckbox value="music">音乐</KyCheckbox>
      <KyCheckbox value="sport">运动</KyCheckbox>
      <KyCheckbox value="reading">阅读</KyCheckbox>
    </KyCheckboxGroup>

    <KyCheckboxGroup v-model="hobbies" fill="#409eff" text-color="#fff">
      <KyCheckboxButton value="music">音乐</KyCheckboxButton>
      <KyCheckboxButton value="sport">运动</KyCheckboxButton>
      <KyCheckboxButton value="reading">阅读</KyCheckboxButton>
    </KyCheckboxGroup>

    <span>已选择：{{ hobbies.join("、") }}</span>
  </div>
</template>
