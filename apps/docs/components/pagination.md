<script setup lang="ts">
import Basic from "../examples/pagination/Basic.vue";
</script>

# Pagination 分页

数据量较多时，通过分页切换不同的数据集合。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyPagination v-model:current-page="currentPage" :total="100" :page-size="10" />
```

## API

### Props

| 属性名       | 说明           | 类型                      | 默认值              |
| ------------ | -------------- | ------------------------- | ------------------- |
| total        | 总条目数       | `number`                  | `0`                 |
| page-size    | 每页条目数     | `number`                  | `10`                |
| current-page | 当前页码       | `number`                  | `1`                 |
| layout       | 分页布局       | `string`                  | `prev, pager, next` |
| pager-count  | 最大页码按钮数 | `number`                  | `7`                 |
| background   | 是否显示背景   | `boolean`                 | `false`             |
| disabled     | 是否禁用       | `boolean`                 | `false`             |
| size         | 尺寸           | `small / default / large` | `default`           |

### Events

| 事件名 | 说明             | 参数             |
| ------ | ---------------- | ---------------- |
| change | 当前页变化时触发 | `(page: number)` |
