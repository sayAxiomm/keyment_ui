<template>
  <!-- 
    role="radiogroup" 是无障碍语义。
    告诉浏览器和辅助工具：这一块是一组 radio。
  -->
  <div
    class="keyment-radio-group"
    role="radiogroup"
  >
    <!-- 
      默认插槽。
      外部写在 <ky-radio-group> 中间的 <ky-radio> 会渲染到这里。
    -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, provide } from "vue";
import type { RadioGroupEmits, RadioGroupProps, RadioValue,RadioGroupContext} from "./radio";
import type { FormItemContext } from "../Form/form";

defineOptions({
  name: "KyRadioGroup"
});

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  border: false,
  size: "default",
  validateEvent: true,
  textColor: "#ffffff",
  fill: "#409eff"
});

const emit = defineEmits<RadioGroupEmits>();
const formItem = inject<FormItemContext>("formItem");

function changeEvent(value: RadioValue) {
  emit("update:modelValue", value);
  emit("change", value);

  if (props.validateEvent) {
    nextTick(() => {
      formItem?.validate("change");
    });
  }
}
// 数据频繁变化,要实时更新,就要写成这种样子
provide("radioGroup", {
  get modelValue() {
    return props.modelValue;
  },
  get disabled() {
    return props.disabled;
  },
  get border() {
    return props.border;
  },
  get size() {
    return props.size;
  },
  get name() {
    return props.name;
  },
  get validateEvent() {
  return props.validateEvent;
  },
  get textColor() {
    return props.textColor;
  },
  get fill() {
    return props.fill;
  },
  changeEvent
});
</script>

<style scoped>
.keyment-radio-group {
  display: inline-flex;
  align-items: center;
}
</style>
