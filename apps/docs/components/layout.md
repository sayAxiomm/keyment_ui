<script setup lang="ts">
import Basic from "../examples/layout/Basic.vue";
</script>

# Layout 栅格

通过 24 栅格快速创建页面布局。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyRow :gutter="12">
  <KyCol :span="8">8</KyCol>
  <KyCol :span="8">8</KyCol>
  <KyCol :span="8">8</KyCol>
</KyRow>
```

## Row API

| 属性名  | 说明           | 类型                                                                 | 默认值  |
| ------- | -------------- | -------------------------------------------------------------------- | ------- |
| gutter  | 栅格间隔       | `number`                                                             | `0`     |
| justify | 水平排列方式   | `start / end / center / space-around / space-between / space-evenly` | `start` |
| align   | 垂直对齐方式   | `top / middle / bottom`                                              | `top`   |
| tag     | 自定义元素标签 | `string`                                                             | `div`   |

## Col API

| 属性名 | 说明           | 类型     | 默认值 |
| ------ | -------------- | -------- | ------ |
| span   | 占据的栅格数   | `number` | `24`   |
| offset | 左侧偏移栅格数 | `number` | `0`    |
| push   | 向右移动栅格数 | `number` | `0`    |
| pull   | 向左移动栅格数 | `number` | `0`    |
| tag    | 自定义元素标签 | `string` | `div`  |
