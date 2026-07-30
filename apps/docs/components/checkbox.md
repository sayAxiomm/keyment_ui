<script setup lang="ts">
import Basic from "../examples/checkbox/Basic.vue";
</script>

# Checkbox 多选框

在一组候选项中选择一个或多个结果。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyCheckboxGroup v-model="hobbies" :min="1" :max="2">
  <KyCheckbox value="music">音乐</KyCheckbox>
  <KyCheckbox value="sport">运动</KyCheckbox>
</KyCheckboxGroup>
```

## Checkbox API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 单个多选框绑定值 | `string / number / boolean` | — |
| value | 在 CheckboxGroup 中代表的值 | `string / number / boolean / object` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 是否显示半选状态 | `boolean` | `false` |
| true-value | 选中时的值 | `string / number / boolean` | `true` |
| false-value | 未选中时的值 | `string / number / boolean` | `false` |

## CheckboxGroup API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 已选值数组 | `array` | `[]` |
| min | 最少选择数量 | `number` | — |
| max | 最多选择数量 | `number` | — |
| disabled | 是否禁用整组 | `boolean` | `false` |
| fill | 按钮激活背景颜色 | `string` | — |
| text-color | 按钮激活文字颜色 | `string` | — |
