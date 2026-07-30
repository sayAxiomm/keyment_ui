<script setup lang="ts">
import Basic from "../examples/tabs/Basic.vue";
</script>

# Tabs 标签页

在同一区域切换不同分类的内容。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyTabs v-model="activeTab">
  <KyTabPane label="用户管理" name="user">
    用户管理内容
  </KyTabPane>
  <KyTabPane label="配置管理" name="config">
    配置管理内容
  </KyTabPane>
</KyTabs>
```

## Tabs API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 当前激活标签名 | `string / number` | — |

## TabPane API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签标题 | `string` | `""` |
| name | 标签唯一标识 | `string / number` | label |
| disabled | 是否禁用 | `boolean` | `false` |

## Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| tab-click | 点击标签时触发 | `(name: string / number)` |
