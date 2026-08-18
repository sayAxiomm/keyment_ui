<script setup lang="ts">
import { ref } from "vue";
import { KyTabPane, KyTabs } from "@keyment/components";

const activeTab = ref("user");
</script>

<template>
  <div class="component-preview__column">
    <KyTabs v-model="activeTab">
      <KyTabPane label="用户管理" name="user"> 用户管理内容 </KyTabPane>
      <KyTabPane label="配置管理" name="config"> 配置管理内容 </KyTabPane>
      <KyTabPane label="角色管理" name="role" disabled> 角色管理内容 </KyTabPane>
    </KyTabs>
    <span>当前标签：{{ activeTab }}</span>
  </div>
</template>
