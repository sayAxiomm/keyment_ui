<template>
  <form
    class="keyment-form"
    :class="formClass"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
import { computed, provide } from "vue";
import type { FormProps ,FormContext} from "./form";

defineOptions({
  name: "KyForm"
});

const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: "80px",
  labelPosition: "right"
});

// form 的 class，后面通过 class 控制 label 是 left / right / top。
const formClass = computed(() => {
  return {
    [`keyment-form--label-${props.labelPosition}`]: props.labelPosition
  };
});

// 把 form 的配置传给内部的 form-item。
// 后面 form-item 可以通过 inject 拿到 labelWidth、labelPosition、model。
provide<FormContext>("form", {
  model: props.model,
  rules: props.rules,
  labelWidth: props.labelWidth,
  labelPosition: props.labelPosition
});


</script>

<style scoped>
.keyment-form {
  width: 100%;
}

</style>
