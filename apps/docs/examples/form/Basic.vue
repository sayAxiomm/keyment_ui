<script setup lang="ts">
import { reactive } from "vue";
import {
  KyButton,
  KyForm,
  KyFormItem,
  KyInput,
  KySwitch
} from "@keyment/components";

const form = reactive({
  username: "",
  description: "",
  enabled: true
});
</script>

<template>
  <KyForm
    :model="form"
    label-width="90px"
    class="form-demo"
  >
    <KyFormItem label="用户名" prop="username" required>
      <KyInput v-model="form.username" placeholder="请输入用户名" />
    </KyFormItem>
    <KyFormItem label="个人介绍" prop="description">
      <KyInput
        v-model="form.description"
        type="textarea"
        placeholder="请输入个人介绍"
      />
    </KyFormItem>
    <KyFormItem label="启用账号" prop="enabled">
      <KySwitch v-model="form.enabled" />
    </KyFormItem>
    <KyFormItem>
      <KyButton type="primary">保存</KyButton>
    </KyFormItem>
  </KyForm>
</template>

<style scoped>
.form-demo {
  max-width: 520px;
}
</style>
