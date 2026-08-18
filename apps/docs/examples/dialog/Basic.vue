<script setup lang="ts">
import { ref } from "vue";
import { KyButton, KyDialog } from "@keyment/components";

const visible = ref(false);
</script>

<template>
  <div>
    <KyButton type="primary" @click="visible = true"> 打开对话框 </KyButton>

    <KyDialog v-model="visible" title="编辑资料" width="min(520px, 90vw)">
      这里可以放置表单或其他内容。

      <template #footer>
        <div class="dialog-actions">
          <KyButton @click="visible = false">取消</KyButton>
          <KyButton type="primary" @click="visible = false">确定</KyButton>
        </div>
      </template>
    </KyDialog>
  </div>
</template>

<style scoped>
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
