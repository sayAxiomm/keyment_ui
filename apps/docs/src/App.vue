<template>
  <main>
    <h1>Button 按钮</h1>

    <div class="button-row">
      <ky-button>默认按钮</ky-button>
      <ky-button type="primary">主要按钮</ky-button>
      <ky-button type="success">成功按钮</ky-button>
      <ky-button type="warning">警告按钮</ky-button>
      <ky-button type="danger">危险按钮</ky-button>
      <ky-button type="info">信息按钮</ky-button>
    </div>
    <div class="button-row">
      <ky-button plain>朴素按钮</ky-button>
      <ky-button type="primary" plain>主要按钮</ky-button>
      <ky-button type="success" plain>成功按钮</ky-button>
      <ky-button type="warning" plain>警告按钮</ky-button>
      <ky-button type="danger" plain>危险按钮</ky-button>
      <ky-button type="info" plain>信息按钮</ky-button>
    </div>
 <div class="button-row">
      <ky-button round>默认按钮</ky-button>
      <ky-button type="primary" round>主要按钮</ky-button>
      <ky-button type="success" round>成功按钮</ky-button>
      <ky-button type="warning" round>警告按钮</ky-button>
      <ky-button type="danger" round>危险按钮</ky-button>
      <ky-button type="info" round>信息按钮</ky-button>
    </div>
    <div class="button-row">
      <ky-button disabled>默认按钮</ky-button>
      <ky-button type="primary" disabled>主要按钮</ky-button>
      <ky-button type="success" disabled>成功按钮</ky-button>
      <ky-button type="warning" disabled>警告按钮</ky-button>
      <ky-button type="danger" disabled>危险按钮</ky-button>
      <ky-button type="info" disabled>信息按钮</ky-button>
    </div>
    <div class="button-row">
      <ky-button size="small">小按钮</ky-button>
      <ky-button>默认尺寸</ky-button>
      <ky-button size="large">大按钮</ky-button>
    </div>
    <div class="button-row">
      <ky-button-group direction="vertical">
        <ky-button>上</ky-button>
        <ky-button>中</ky-button>
        <ky-button>下</ky-button>
      </ky-button-group>
      <ky-button-group>
  <ky-button>左</ky-button>
  <ky-button>中</ky-button>
  <ky-button>右</ky-button>
</ky-button-group>
    </div>
 <ky-icon :size="24" color="black">
  <Plus></Plus>
  <Minus></Minus>
</ky-icon>
  </main>
</template>

<script setup lang="ts">
// 从组件库包里导入 Button，用来在 docs 页面预览组件效果
import { KyButton,KyButtonGroup } from "@keyment/components";
import {KyIcon} from "@keyment/components"
// import { Plus,Minus } from "@keyment/icons";
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
