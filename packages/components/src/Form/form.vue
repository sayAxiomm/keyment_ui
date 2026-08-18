<template>
  <form class="keyment-form" :class="formClass">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { computed, provide, reactive } from "vue";
import type { FormContext, FormItemContext, FormProps } from "./form";

defineOptions({
  name: "KyForm"
});

const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: "80px",
  labelPosition: "right"
});

const fields: FormItemContext[] = [];

// form 的 class，后面通过 class 控制 label 是 left / right / top。
const formClass = computed(() => {
  return {
    [`keyment-form--label-${props.labelPosition}`]: props.labelPosition
  };
});

// 收集内部的 form-item，后面 validate() 会统一校验这些表单项。
const addField = (field: FormItemContext) => {
  fields.push(field);
};

// form-item 卸载时从列表里移除，避免后面校验到已经不存在的表单项。
const removeField = (field: FormItemContext) => {
  const index = fields.indexOf(field);

  if (index > -1) {
    fields.splice(index, 1);
  }
};

// 校验整个表单，所有 form-item 都通过时才返回 true。
const validate = async () => {
  const results = await Promise.all(
    fields.map((field) => {
      return field.validate();
    })
  );

  return results.every(Boolean);
};

// 只校验某一个字段。
const validateField = async (prop: string) => {
  const field = fields.find((item) => item.prop === prop);

  if (!field) {
    return true;
  }

  return field.validate();
};

// 清空校验状态。不传 prop 时清空整个表单。
const clearValidate = (prop?: string) => {
  fields.forEach((field) => {
    if (!prop || field.prop === prop) {
      field.clearValidate();
    }
  });
};

// 把 form 的配置传给内部的 form-item。
// 后面 form-item 可以通过 inject 拿到 model、rules、labelWidth、labelPosition。
const formContext = reactive<FormContext>({
  get model() {
    return props.model;
  },
  get rules() {
    return props.rules;
  },
  get labelWidth() {
    return props.labelWidth;
  },
  get labelPosition() {
    return props.labelPosition;
  },
  addField,
  removeField
});

provide<FormContext>("form", formContext);

defineExpose({
  validate,
  validateField,
  clearValidate
});
</script>

<style scoped>
.keyment-form {
  width: 100%;
}
</style>
