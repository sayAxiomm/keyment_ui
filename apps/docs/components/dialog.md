<script setup lang="ts">
import Basic from "../examples/dialog/Basic.vue";
</script>

# Dialog 对话框

在当前页面上方展示需要用户关注或确认的内容。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyDialog v-model="visible" title="编辑资料" width="520px">
  对话框内容

  <template #footer>
    <KyButton @click="visible = false">取消</KyButton>
    <KyButton type="primary" @click="visible = false">确定</KyButton>
  </template>
</KyDialog>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 是否显示对话框 | `boolean` | `false` |
| title | 对话框标题 | `string` | `""` |
| width | 对话框宽度 | `string` | `50%` |
| close-on-click-modal | 点击遮罩是否关闭 | `boolean` | `true` |
| close-on-press-escape | 按 Esc 是否关闭 | `boolean` | `true` |
| show-close | 是否显示关闭按钮 | `boolean` | `true` |

### Events

| 事件名 | 说明 |
| --- | --- |
| open | 对话框打开时触发 |
| close | 对话框关闭时触发 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 对话框主体内容 |
| footer | 对话框底部内容 |
