<template>
  <main>
    <h1>Button 按钮</h1>

    <div class="button-row">
      <ky-button>默认按钮</ky-button>
      <ky-button type="primary" :icon="Plus">主要按钮</ky-button>
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

<!-- 
  最外层 ky-container 里面有 ky-header 和 ky-footer，
  所以 container.vue 会自动推断 direction 为 vertical。
-->
<ky-container class="demo-container">
  <ky-header class="demo-header">Header</ky-header>

  <!-- 
    里面这一层 ky-container 没有 header/footer，
    只有 aside 和 main，所以会自动推断 direction 为 horizontal。
  -->
  <ky-container>
    <ky-aside class="demo-aside" width="200px">Aside</ky-aside>
    <ky-main class="demo-main">Main</ky-main>
  </ky-container>

  <ky-footer class="demo-footer">Footer</ky-footer>
</ky-container>

<ky-link type="primary">常规链接</ky-link>
<ky-link type="success">成功链接</ky-link>

<ky-row :gutter="5" justify="end">
  <ky-col :span="1">
    <div class="grid-demo">8</div>
  </ky-col>
  <ky-col :span="8">
    <div class="grid-demo">8</div>
  </ky-col>
  <ky-col :span="8">
    <div class="grid-demo">8</div>
  </ky-col>
</ky-row>
 <!-- <ky-radio v-model="gender" value="mel" border>男</ky-radio> -->
  <p>当前值：{{ gender }}</p>
<ky-radio-group v-model="gender">
  <ky-radio value="mel" >男</ky-radio>
  <ky-radio value="fmel" >女</ky-radio>
</ky-radio-group>
 <ky-radio-group
  v-model="radioValue"
  fill="#67c23a"
  text-color="red"
>
  <ky-radio-button value="a">A</ky-radio-button>
  <ky-radio-button value="b" disabled>B</ky-radio-button>
  <ky-radio-button value="c">C</ky-radio-button>
</ky-radio-group>
  <p>status：{{ status }}</p>
<ky-checkbox
  v-model="status"
  true-value="yes"
  false-value="no"
>
  启用
</ky-checkbox>
<p>hobbies：{{ hobbies }}</p>
<ky-checkbox :indeterminate="true">
  半选状态
</ky-checkbox>
<ky-checkbox-group v-model="hobbies" :min="1" :max="2">
  <ky-checkbox value="music">音乐</ky-checkbox>
  <ky-checkbox value="sport">运动</ky-checkbox>
  <ky-checkbox value="read">阅读</ky-checkbox>
</ky-checkbox-group>
<p>button hobbies：{{ hobbies2 }}</p>

<ky-checkbox-group
  v-model="hobbies2"
  fill="#67c23a"
  text-color="#ffffff"
>
  <ky-checkbox-button value="music">音乐</ky-checkbox-button>
  <ky-checkbox-button value="sport">运动</ky-checkbox-button>
  <ky-checkbox-button value="read">阅读</ky-checkbox-button>
</ky-checkbox-group>
  </main>
</template>

<script setup lang="ts">
// 从组件库包里导入 Button，用来在 docs 页面预览组件效果
import {
  KyButton,
  KyButtonGroup,
  KyIcon,
  KyContainer,
  KyHeader,
  KyAside,
  KyMain,
  KyFooter,
  KyLink,
  KyRow, 
  KyCol,
  KyRadio,
  KyRadioGroup,
  KyRadioButton,
  KyCheckbox,
  KyCheckboxGroup,
  KyCheckboxButton
} from "@keyment/components";
import { Plus,Minus } from "@keyment/icons";
import { ref } from "vue";
const radioValue=ref('c')
const gender = ref("mel");
const status = ref("no");
const hobbies = ref(["music"]);
const hobbies2=ref(["music"])
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
.demo-container {
  height: 300px;
  border: 1px solid #dcdfe6;
}

.demo-header,
.demo-footer {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #d9ecff;
}

.demo-aside {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #ecf5ff;
}

.demo-main {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #ffffff;
}
.grid-demo {
  min-height: 40px;
  padding: 12px;
  color: #fff;
  background: #409eff;
  box-sizing: border-box;
   border-radius: 4px;
}
</style>
