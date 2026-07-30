<script setup lang="ts">
import Basic from "../examples/upload/Basic.vue";
</script>

# Upload 上传

通过点击或拖拽选择文件，并支持自动上传和手动上传。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyUpload
  :auto-upload="false"
  multiple
  :limit="3"
>
  选择文件
</KyUpload>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | 上传接口地址 | `string` | — |
| method | 请求方法 | `post / put / patch` | `post` |
| auto-upload | 选择后是否自动上传 | `boolean` | `true` |
| multiple | 是否允许多选 | `boolean` | `false` |
| drag | 是否启用拖拽上传 | `boolean` | `false` |
| accept | 接受的文件类型 | `string` | — |
| limit | 最大文件数量 | `number` | — |
| show-file-list | 是否显示文件列表 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |

### Expose

| 方法名 | 说明 |
| --- | --- |
| submit | 手动上传待上传文件 |
| clearFiles | 清空文件列表 |
