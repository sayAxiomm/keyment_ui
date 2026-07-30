<script setup lang="ts">
import Basic from "../examples/icon/Basic.vue";
</script>

# Icon 图标

用于统一控制 SVG 图标的尺寸和颜色。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyIcon :size="28" color="#409eff">
  <Search />
</KyIcon>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 图标尺寸，数字自动添加 px | `number / string` | — |
| color | 图标颜色 | `string` | 继承文字颜色 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | SVG 图标组件 |
