<script setup lang="ts">
import Basic from "../examples/form/Basic.vue";
</script>

# Form 表单

由输入组件、表单项和校验规则组成，用于收集和校验数据。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyForm :model="form" label-width="90px">
  <KyFormItem label="用户名" prop="username" required>
    <KyInput v-model="form.username" />
  </KyFormItem>
</KyForm>
```

## Form API

| 属性名         | 说明         | 类型                      | 默认值  |
| -------------- | ------------ | ------------------------- | ------- |
| model          | 表单数据对象 | `Record<string, unknown>` | —       |
| rules          | 表单校验规则 | `object`                  | —       |
| label-width    | 标签宽度     | `string / number`         | `80px`  |
| label-position | 标签位置     | `left / right / top`      | `right` |

## FormItem API

| 属性名   | 说明              | 类型      | 默认值  |
| -------- | ----------------- | --------- | ------- |
| label    | 标签文字          | `string`  | —       |
| prop     | 对应 model 的字段 | `string`  | —       |
| required | 是否显示必填标记  | `boolean` | `false` |
| error    | 外部错误信息      | `string`  | —       |

## Form Expose

| 方法名        | 说明           |
| ------------- | -------------- |
| validate      | 校验全部表单项 |
| validateField | 校验指定字段   |
| clearValidate | 清除校验状态   |
