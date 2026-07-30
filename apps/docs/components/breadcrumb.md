<script setup lang="ts">
import Basic from "../examples/breadcrumb/Basic.vue";
</script>

# Breadcrumb 面包屑

显示当前页面在网站层级中的位置，并提供返回路径。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyBreadcrumb separator="/">
  <KyBreadcrumbItem>首页</KyBreadcrumbItem>
  <KyBreadcrumbItem>组件</KyBreadcrumbItem>
  <KyBreadcrumbItem>面包屑</KyBreadcrumbItem>
</KyBreadcrumb>
```

## Breadcrumb API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| separator | 分隔符 | `string` | `/` |

## BreadcrumbItem API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| to | 跳转地址 | `string` | — |
| replace | 是否使用 replace 跳转 | `boolean` | `false` |
