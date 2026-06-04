<template>
  <div class="keyment-select">
    <!-- 选择器输入区域：点击后打开或关闭下拉面板 -->
    <div
      class="keyment-select__wrapper"
      @click="handleToggle"
    >
      <input
        class="keyment-select__inner"
        type="text"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="true"
      />
    </div>

    <!-- 下拉面板：后面 option 会渲染到这里 -->
    <div
      v-if="dropdownVisible"
      class="keyment-select__dropdown"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { SelectEmits, SelectProps } from "./select";

defineOptions({
  name: "KySelect"
});

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: "请选择",
  disabled: false,
  clearable: false,
  size: "default"
});

const emit = defineEmits<SelectEmits>();

// 下拉面板是否显示。
const dropdownVisible = ref(false);

// 点击选择器时，打开或关闭下拉面板。
const handleToggle = () => {
  if (props.disabled) {
    return;
  }

  dropdownVisible.value = !dropdownVisible.value;
};
</script>

<style scoped>
.keyment-select {
  position: relative;
  display: inline-block;
  width: 240px;
}

.keyment-select__wrapper {
  position: relative;
}

.keyment-select__inner {
  width: 100%;
  height: 32px;
  padding: 0 32px 0 11px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  color: #606266;
  font-size: 14px;
  line-height: 32px;
  outline: none;
  cursor: pointer;
}

.keyment-select__inner:disabled {
  color: #a8abb2;
  background: #f5f7fa;
  cursor: not-allowed;
}

.keyment-select__dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 1000;
  width: 100%;
  padding: 6px 0;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}
</style>