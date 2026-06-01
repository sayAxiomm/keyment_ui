<template>
  <!-- 
    Switch 本质是一个二选一控件。
    外层用 label，这样点击整个开关区域都能触发内部 input。
  -->
  <label class="keyment-switch" :class="switchClass">
    <!-- 
      原生 checkbox 负责真实的选中/取消行为。
      视觉上会隐藏它，自己用 span 画开关。
    -->
    <input
      class="keyment-switch__original"
      type="checkbox"
      :checked="isChecked"
      :disabled="props.disabled || props.loading"
      @change="handleChange"
    />
    <!-- 外层 span：轨道，内层 span：圆点 -->
    <span class="keyment-switch__core">
      <span class="keyment-switch__action"></span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { SwitchProps, SwitchEmits } from "./switch";

defineOptions({
  name: "KySwitch"
});

const props = withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
  loading: false,
  activeValue: true,
  inactiveValue: false,
  validateEvent: true,
  inlinePrompt: false
});

const emit = defineEmits<SwitchEmits>();
const switchClass = computed(() => ({
  "is-checked": isChecked.value,
  "is-disabled": props.disabled,
  "is-loading": props.loading
}));

// 当前是否处于打开状态。
// modelValue 等于 activeValue，就表示打开。
const isChecked = computed(() => {
  return props.modelValue === props.activeValue;
});

const handleChange = () => {
  if (props.disabled || props.loading) {
    return;
  }

  const nextValue = isChecked.value ? props.inactiveValue : props.activeValue;

  emit("update:modelValue", nextValue);
  emit("change", nextValue);
};
</script>
<style scoped>
.keyment-switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.keyment-switch__original {
  position: absolute;
  opacity: 0;
  outline: none;
  z-index: -1;
}

.keyment-switch__core {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 40px;
  height: 20px;
  border-radius: 999px;
  background: #dcdfe6;
  box-sizing: border-box;
  /* 背景色变化时，用 0.2 秒平滑过渡，不要瞬间跳变。 */
  transition: background-color 0.2s;
}
.keyment-switch.is-checked .keyment-switch__core {
  background: #409eff;
}
.keyment-switch.is-checked .keyment-switch__action {
  left: 22px;
}
.keyment-switch__action {
  position: absolute;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ffffff;
  transition: left 0.2s;
}
</style>