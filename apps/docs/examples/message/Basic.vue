<script setup lang="ts">
import { KyButton, KyMessage } from "@keyment/components";

const showMessage = (type: "success" | "warning" | "info" | "error") => {
  KyMessage[type]({
    message: `${type} 类型的消息提示`,
    showClose: true
  });
};
</script>

<template>
  <div class="component-preview__row">
    <KyButton type="success" @click="showMessage('success')">成功</KyButton>
    <KyButton type="warning" @click="showMessage('warning')">警告</KyButton>
    <KyButton type="info" @click="showMessage('info')">消息</KyButton>
    <KyButton type="danger" @click="showMessage('error')">错误</KyButton>
  </div>
</template>
