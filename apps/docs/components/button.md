<script setup lang="ts">
import Basic from "../examples/button/Basic.vue";
import Group from "../examples/button/Group.vue";
import States from "../examples/button/States.vue";
</script>

# Button 按钮

用于触发操作。

## 基础用法

使用 `type` 设置按钮的视觉类型。

<div class="component-preview">
  <Basic />
</div>

```vue
<KyButton>默认按钮</KyButton>
<KyButton type="primary">主要按钮</KyButton>
<KyButton type="success">成功按钮</KyButton>
```

## 按钮状态

通过 `plain`、`round`、`disabled` 和 `size` 设置按钮状态。

<div class="component-preview">
  <States />
</div>

```vue
<KyButton type="primary" plain>朴素按钮</KyButton>
<KyButton type="primary" round>圆角按钮</KyButton>
<KyButton type="primary" disabled>禁用按钮</KyButton>
<KyButton size="small">小型按钮</KyButton>
<KyButton size="large">大型按钮</KyButton>
```

## 按钮组

使用 `KyButtonGroup` 将多个按钮组合展示。

<div class="component-preview">
  <Group />
</div>

```vue
<KyButtonGroup>
  <KyButton>上一页</KyButton>
  <KyButton type="primary">当前页</KyButton>
  <KyButton>下一页</KyButton>
</KyButtonGroup>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `default / primary / success / warning / danger / info` | `default` |
| size | 按钮尺寸 | `small / default / large` | `default` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否处于加载状态 | `boolean` | `false` |
| plain | 是否为朴素按钮 | `boolean` | `false` |
| round | 是否为圆角按钮 | `boolean` | `false` |
| native-type | 原生按钮类型 | `button / submit / reset` | `button` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |

### ButtonGroup Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 按钮排列方向 | `horizontal / vertical` | `horizontal` |
