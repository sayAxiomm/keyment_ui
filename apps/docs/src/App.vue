<template>
  <main>
    <h1>Button 按钮</h1>

    <div class="button-row">
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </div>

    <div class="button-row">
      <Button size="small">小按钮</Button>
      <Button>默认尺寸</Button>
      <Button size="large">大按钮</Button>
    </div>

    <div class="button-row">
      <Button round>圆角按钮</Button>
      <Button disabled>禁用按钮</Button>
      <Button loading>加载中</Button>
      <Button native-type="submit">提交按钮</Button>
    </div>
  </main>
</template>

<script setup lang="ts">
// 从组件库包里导入 Button，用来在 docs 页面预览组件效果
import { Button } from "@keyment/components";
</script>

<style scoped>
main {
  padding: 40px;
}

h1 {
  margin: 0 0 24px;
  font-size: 28px;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}
</style>