<script setup lang="ts">
import Basic from "../examples/backtop/Basic.vue";
</script>

# Backtop 回到顶部

页面滚动超过指定高度后，提供快速返回顶部的入口。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyBacktop :visibility-height="200" :right="40" :bottom="40" />
```

## API

### Props

| 属性名            | 说明               | 类型     | 默认值 |
| ----------------- | ------------------ | -------- | ------ |
| visibility-height | 滚动多少距离后显示 | `number` | `200`  |
| right             | 距离页面右侧的距离 | `number` | `40`   |
| bottom            | 距离页面底部的距离 | `number` | `40`   |

### Events

| 事件名 | 说明           | 参数                  |
| ------ | -------------- | --------------------- |
| click  | 点击按钮时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义按钮内容 |
