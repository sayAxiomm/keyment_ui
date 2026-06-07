<template>
  <div class="keyment-form-item"
      :class="formItemClass"
  >
    <!-- label 区域：显示“用户名 / 密码”这种文字 -->
    <label
      v-if="props.label"
      class="keyment-form-item__label"
      :class="{ 'is-required': props.required }"
      :style="labelStyle"
    >
      {{ props.label }}
    </label>

    <!-- 内容区域：放 input / select / checkbox 等表单组件 -->
    <div class="keyment-form-item__content">
      <slot />

      <div
        v-if="props.error"
        class="keyment-form-item__error"
      >
        {{ props.error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import type { FormItemProps,FormContext } from "./form";

defineOptions({
  name: "KyFormItem"
});

const props = defineProps<FormItemProps>();

// 拿到 ky-form 通过 provide 传下来的配置。
const form = inject<FormContext>("form");

// label 的样式。
const labelStyle = computed(() => {
  const width = form?.labelWidth;

  return {
    width: typeof width === "number" ? `${width}px` : width
  };
});
const formItemClass = computed(() => {
  return {
    [`keyment-form-item--label-${form?.labelPosition}`]: form?.labelPosition
  };
});
</script>

<style scoped>
.keyment-form-item {
  display: flex;
  margin-bottom: 18px;
}

.keyment-form-item__label {
  flex-shrink: 0;
  padding-right: 12px;
  box-sizing: border-box;
  color: #606266;
  font-size: 14px;
  line-height: 32px;
  text-align: right;
}

.keyment-form-item__label.is-required::before {
  content: "*";
  margin-right: 4px;
  color: #f56c6c;
}

.keyment-form-item__content {
  flex: 1;
  min-width: 0;
}

.keyment-form-item__error {
  margin-top: 4px;
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
}

.keyment-form-item--label-left .keyment-form-item__label {
  text-align: left;
}

.keyment-form-item--label-right .keyment-form-item__label {
  text-align: right;
}

.keyment-form-item--label-top {
  display: block;
}

.keyment-form-item--label-top .keyment-form-item__label {
  display: block;
  width: auto !important;
  padding-right: 0;
  margin-bottom: 8px;
  line-height: 1.4;
  text-align: left;
}
</style>
