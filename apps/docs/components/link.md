<script setup lang="ts">
import Basic from "../examples/link/Basic.vue";
</script>

# Link 链接

用于页面之间的跳转。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyLink type="primary" href="#">主要链接</KyLink>
<KyLink type="danger" disabled>禁用链接</KyLink>
```

## API

### Props

| 属性名    | 说明             | 类型                                                    | 默认值    |
| --------- | ---------------- | ------------------------------------------------------- | --------- |
| type      | 链接类型         | `default / primary / success / warning / danger / info` | `default` |
| href      | 原生链接地址     | `string`                                                | —         |
| target    | 原生 target 属性 | `string`                                                | —         |
| disabled  | 是否禁用         | `boolean`                                               | `false`   |
| underline | 是否显示下划线   | `boolean`                                               | `true`    |
| icon      | 左侧图标组件     | `Component`                                             | —         |
