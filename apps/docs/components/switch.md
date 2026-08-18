<script setup lang="ts">
import Basic from "../examples/switch/Basic.vue";
</script>

# Switch 开关

表示两种互斥状态之间的切换。

## 基础用法

使用 `v-model` 绑定开关状态。

<div class="component-preview">
  <Basic />
</div>

```vue
<script setup lang="ts">
import { ref } from "vue";

const enabled = ref(false);
</script>

<template>
  <KySwitch v-model="enabled" active-text="开" inactive-text="关" />
</template>
```

## API

### Props

| 属性名         | 说明             | 类型                        | 默认值    |
| -------------- | ---------------- | --------------------------- | --------- |
| model-value    | 开关值           | `string / number / boolean` | `false`   |
| disabled       | 是否禁用         | `boolean`                   | `false`   |
| loading        | 是否处于加载状态 | `boolean`                   | `false`   |
| size           | 开关尺寸         | `small / default / large`   | `default` |
| active-value   | 开启时的值       | `string / number / boolean` | `true`    |
| inactive-value | 关闭时的值       | `string / number / boolean` | `false`   |
| active-text    | 开启状态文字     | `string`                    | —         |
| inactive-text  | 关闭状态文字     | `string`                    | —         |

### Events

| 事件名 | 说明               | 参数                                 |
| ------ | ------------------ | ------------------------------------ |
| change | 开关状态变化时触发 | `(value: string / number / boolean)` |
