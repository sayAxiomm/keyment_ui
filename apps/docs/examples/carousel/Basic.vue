<script setup lang="ts">
import {
  KyCarousel,
  KyCarouselItem
} from "@keyment/components";
</script>

<template>
  <KyCarousel
    height="220px"
    :autoplay="false"
    indicator-position="outside"
  >
    <KyCarouselItem>
      <div class="carousel-slide carousel-slide--one">1</div>
    </KyCarouselItem>
    <KyCarouselItem>
      <div class="carousel-slide carousel-slide--two">2</div>
    </KyCarouselItem>
    <KyCarouselItem>
      <div class="carousel-slide carousel-slide--three">3</div>
    </KyCarouselItem>
  </KyCarousel>
</template>

<style scoped>
.carousel-slide {
  display: grid;
  height: 100%;
  place-items: center;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
}

.carousel-slide--one {
  background: #409eff;
}

.carousel-slide--two {
  background: #67c23a;
}

.carousel-slide--three {
  background: #e6a23c;
}
</style>
