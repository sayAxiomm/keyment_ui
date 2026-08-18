<script setup lang="ts">
import Basic from "../examples/radio/Basic.vue";
</script>

# Radio 单选框

在一组互斥选项中选择一个结果。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyRadioGroup v-model="city">
  <KyRadio value="beijing">北京</KyRadio>
  <KyRadio value="shanghai">上海</KyRadio>
</KyRadioGroup>
```

## Radio API

| 属性名      | 说明         | 类型                        | 默认值    |
| ----------- | ------------ | --------------------------- | --------- |
| value       | 当前选项的值 | `string / number / boolean` | 必填      |
| model-value | 当前选中的值 | `string / number / boolean` | —         |
| disabled    | 是否禁用     | `boolean`                   | `false`   |
| border      | 是否显示边框 | `boolean`                   | `false`   |
| size        | 尺寸         | `small / default / large`   | `default` |

## RadioGroup API

| 属性名      | 说明             | 类型                        | 默认值    |
| ----------- | ---------------- | --------------------------- | --------- |
| model-value | 当前选中的值     | `string / number / boolean` | —         |
| disabled    | 是否禁用整组     | `boolean`                   | `false`   |
| text-color  | 按钮激活文字颜色 | `string`                    | `#ffffff` |
| fill        | 按钮激活背景颜色 | `string`                    | `#409eff` |
