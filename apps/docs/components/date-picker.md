<script setup lang="ts">
import Basic from "../examples/date-picker/Basic.vue";
</script>

# DatePicker 日期选择器

用于选择日期、月份、年份或日期范围。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyDatePicker v-model="date" clearable />
<KyDatePicker v-model="range" type="daterange" clearable />
```

## API

### Props

| 属性名            | 说明             | 类型                                                       | 默认值       |
| ----------------- | ---------------- | ---------------------------------------------------------- | ------------ |
| model-value       | 绑定值           | `Date / string / array`                                    | —            |
| type              | 选择器类型       | `date / month / year / daterange / monthrange / yearrange` | `date`       |
| placeholder       | 单值占位文字     | `string`                                                   | —            |
| start-placeholder | 范围开始占位文字 | `string`                                                   | `开始日期`   |
| end-placeholder   | 范围结束占位文字 | `string`                                                   | `结束日期`   |
| format            | 显示格式         | `string`                                                   | `YYYY-MM-DD` |
| clearable         | 是否可以清空     | `boolean`                                                  | `false`      |
| disabled          | 是否禁用         | `boolean`                                                  | `false`      |
| readonly          | 是否只读         | `boolean`                                                  | `false`      |
| size              | 尺寸             | `small / default / large`                                  | `default`    |
| disabled-date     | 禁用日期函数     | `(date: Date) => boolean`                                  | —            |
