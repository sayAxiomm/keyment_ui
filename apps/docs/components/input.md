<script setup lang="ts">
import Basic from "../examples/input/Basic.vue";
</script>

# Input 输入框

通过鼠标或键盘输入内容。

## 基础用法

使用 `v-model` 绑定输入值。

<div class="component-preview">
  <Basic />
</div>

```vue
<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <KyInput v-model="value" clearable placeholder="请输入内容" />
</template>
```

## API

### Props

| 属性名          | 说明                 | 类型                         | 默认值  |
| --------------- | -------------------- | ---------------------------- | ------- |
| model-value     | 输入值               | `string`                     | `""`    |
| type            | 输入框类型           | `text / password / textarea` | `text`  |
| placeholder     | 占位文字             | `string`                     | —       |
| disabled        | 是否禁用             | `boolean`                    | `false` |
| clearable       | 是否显示清空按钮     | `boolean`                    | `false` |
| show-password   | 是否显示密码切换按钮 | `boolean`                    | `false` |
| maxlength       | 最大输入长度         | `number`                     | —       |
| show-word-limit | 是否显示字数统计     | `boolean`                    | `false` |

### Events

| 事件名 | 说明                     | 参数                  |
| ------ | ------------------------ | --------------------- |
| input  | 输入值变化时触发         | `(value: string)`     |
| change | 输入完成并发生变化时触发 | `(value: string)`     |
| focus  | 获得焦点时触发           | `(event: FocusEvent)` |
| blur   | 失去焦点时触发           | `(event: FocusEvent)` |
| clear  | 点击清空按钮时触发       | —                     |
