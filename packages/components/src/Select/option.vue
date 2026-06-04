<template>
  <div class="keyment-option">
    {{ props.label ?? props.value }}
  </div>
</template>

<script setup lang="ts">
import type { OptionProps } from "./select";

defineOptions({
  name: "KyOption"
});

const props = withDefaults(defineProps<OptionProps>(), {
  disabled: false
});
</script>

<style scoped>
.keyment-option {
  height: 32px;
  padding: 0 12px;
  color: #606266;
  font-size: 14px;
  line-height: 32px;
  cursor: pointer;
}

.keyment-option:hover {
  background: #f5f7fa;
  color: #409eff;
}
</style>
