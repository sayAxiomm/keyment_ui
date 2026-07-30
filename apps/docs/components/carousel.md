<script setup lang="ts">
import Basic from "../examples/carousel/Basic.vue";
</script>

# Carousel 走马灯

在有限空间内循环展示图片、卡片或其他内容。

## 基础用法

<div class="component-preview">
  <Basic />
</div>

```vue
<KyCarousel height="220px" :autoplay="false">
  <KyCarouselItem>第一页</KyCarouselItem>
  <KyCarouselItem>第二页</KyCarouselItem>
</KyCarousel>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 走马灯高度 | `string` | `300px` |
| initial-index | 初始索引 | `number` | `0` |
| autoplay | 是否自动播放 | `boolean` | `true` |
| interval | 自动播放间隔，单位毫秒 | `number` | `3000` |
| loop | 是否循环播放 | `boolean` | `true` |
| arrow | 箭头显示方式 | `always / hover / never` | `hover` |
| indicator-position | 指示器位置 | `inside / outside / none` | `inside` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| change | 当前页变化时触发 | `(current: number, previous: number)` |
