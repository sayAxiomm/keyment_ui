# 快速开始

## 完整引入

```ts
import { createApp } from "vue";
import KeymentUI from "@keyment/components";
import App from "./App.vue";

const app = createApp(App);

app.use(KeymentUI);
app.mount("#app");
```

## 按需引入

```vue
<script setup lang="ts">
import { KyButton, KyInput } from "@keyment/components";
</script>

<template>
  <KyButton type="primary">主要按钮</KyButton>
  <KyInput placeholder="请输入内容" />
</template>
```
