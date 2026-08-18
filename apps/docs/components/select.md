<script setup lang="ts">
import Basic from "../examples/select/Basic.vue";
</script>

# Select 选择器

当选项较多时，通过下拉菜单选择一个或多个结果。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KySelect v-model="city" clearable>
  <KyOption label="北京" value="beijing" />
  <KyOption label="上海" value="shanghai" />
</KySelect>
```

## Select API

| 属性名      | 说明         | 类型                                | 默认值    |
| ----------- | ------------ | ----------------------------------- | --------- |
| model-value | 绑定值       | `string / number / boolean / array` | —         |
| placeholder | 占位文字     | `string`                            | `请选择`  |
| disabled    | 是否禁用     | `boolean`                           | `false`   |
| clearable   | 是否可以清空 | `boolean`                           | `false`   |
| multiple    | 是否允许多选 | `boolean`                           | `false`   |
| size        | 尺寸         | `small / default / large`           | `default` |

## Option API

| 属性名   | 说明     | 类型                        | 默认值  |
| -------- | -------- | --------------------------- | ------- |
| value    | 选项值   | `string / number / boolean` | 必填    |
| label    | 显示文字 | `string`                    | value   |
| disabled | 是否禁用 | `boolean`                   | `false` |
