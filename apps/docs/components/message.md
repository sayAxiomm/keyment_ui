<script setup lang="ts">
import Basic from "../examples/message/Basic.vue";
</script>

# Message 消息提示

用于提供成功、警告、普通信息和错误等轻量反馈。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```ts
import { KyMessage } from "@keyment/components";

KyMessage.success("保存成功");

KyMessage.warning({
  message: "请检查表单内容",
  showClose: true,
  duration: 5000
});
```

## API

### 调用方法

| 方法名 | 说明 |
| --- | --- |
| KyMessage | 普通消息 |
| KyMessage.success | 成功消息 |
| KyMessage.warning | 警告消息 |
| KyMessage.info | 信息消息 |
| KyMessage.error | 错误消息 |

### Options

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 消息文字 | `string` | `""` |
| type | 消息类型 | `success / warning / info / error` | `info` |
| duration | 显示时间，0 表示不自动关闭 | `number` | `3000` |
| show-close | 是否显示关闭按钮 | `boolean` | `false` |

调用后返回的实例提供 `close()` 方法，可手动关闭消息。
