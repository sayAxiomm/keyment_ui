<script setup lang="ts">
import {
  KyAside,
  KyContainer,
  KyFooter,
  KyHeader,
  KyMain
} from "@keyment/components";
</script>

<template>
  <KyContainer class="container-demo">
    <KyHeader class="container-demo__header">Header</KyHeader>
    <KyContainer>
      <KyAside class="container-demo__aside" width="140px">Aside</KyAside>
      <KyMain class="container-demo__main">Main</KyMain>
    </KyContainer>
    <KyFooter class="container-demo__footer">Footer</KyFooter>
  </KyContainer>
</template>

<style scoped>
.container-demo {
  height: 300px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.container-demo__header,
.container-demo__footer {
  display: grid;
  place-items: center;
  color: #1f5f99;
  background: #d9ecff;
}

.container-demo__aside {
  display: grid;
  place-items: center;
  background: #ecf5ff;
}

.container-demo__main {
  display: grid;
  place-items: center;
}
</style>
