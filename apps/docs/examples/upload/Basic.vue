<script setup lang="ts">
import { KyUpload } from "@keyment/components";
</script>

<template>
  <div class="component-preview__column">
    <KyUpload :auto-upload="false" multiple :limit="3" accept="image/*"> 选择图片 </KyUpload>

    <KyUpload drag multiple :auto-upload="false" :limit="5"> 将文件拖到这里，或点击选择 </KyUpload>
  </div>
</template>
