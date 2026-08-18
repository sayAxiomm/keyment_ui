<script setup lang="ts">
import Basic from "../examples/container/Basic.vue";
</script>

# Container 布局容器

用于搭建 Header、Aside、Main 和 Footer 等常见页面结构。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyContainer>
  <KyHeader>Header</KyHeader>
  <KyContainer>
    <KyAside width="200px">Aside</KyAside>
    <KyMain>Main</KyMain>
  </KyContainer>
  <KyFooter>Footer</KyFooter>
</KyContainer>
```

## API

| 组件        | 属性      | 说明                            | 默认值         |
| ----------- | --------- | ------------------------------- | -------------- |
| KyContainer | direction | 布局方向：horizontal / vertical | 根据子组件推断 |
| KyHeader    | height    | 顶栏高度                        | `60px`         |
| KyAside     | width     | 侧栏宽度                        | `300px`        |
| KyFooter    | height    | 底栏高度                        | `60px`         |
