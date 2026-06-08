<template>
  <div
    class="keyment-form-item"
    :class="formItemClass"
  >
    <label
      v-if="props.label"
      class="keyment-form-item__label"
      :class="{ 'is-required': isRequired }"
      :style="labelStyle"
    >
      {{ props.label }}
    </label>

    <div class="keyment-form-item__content">
      <slot />

      <div
        v-if="validateMessage"
        class="keyment-form-item__error"
      >
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue";
import type {
  FormContext,
  FormItemContext,
  FormItemProps,
  FormRule,
  FormValidateTrigger
} from "./form";

defineOptions({
  name: "KyFormItem"
});

const props = defineProps<FormItemProps>();

// 拿到 ky-form 通过 provide 传下来的配置。
const form = inject<FormContext>("form");

const validateState = ref<"" | "success" | "error">("");
const innerValidateMessage = ref("");

// 优先显示外部传入的 error，否则显示内部校验产生的错误。
const validateMessage = computed(() => {
  return props.error || innerValidateMessage.value;
});

// 根据 prop 从 form.model 中拿到当前表单项的值。
const fieldValue = computed(() => {
  if (!props.prop || !form?.model) {
    return undefined;
  }

  return form.model[props.prop];
});

// 根据 prop 从 form.rules 中拿到当前表单项的规则。
// 为了后面统一循环校验，这里会把单条规则也转成数组。
const fieldRules = computed<FormRule[]>(() => {
  const rules: FormRule[] = [];

  if (props.prop && form?.rules) {
    const propRules = form.rules[props.prop];

    if (propRules) {
      rules.push(...(Array.isArray(propRules) ? propRules : [propRules]));
    }
  }

  if (props.required && !rules.some((rule) => rule.required)) {
    rules.push({
      required: true,
      message: `${props.label || props.prop || "该字段"}不能为空`
    });
  }

  return rules;
});

// required 可以来自 props.required，也可以来自 rules 里的 required。
const isRequired = computed(() => {
  return props.required || fieldRules.value.some((rule) => rule.required);
});

// 判断一个值是否为空。数组空数组也算空。
const isEmptyValue = (value: unknown) => {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
};

// min/max 校验需要用到长度。
const getValueLength = (value: unknown) => {
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length;
  }

  return String(value ?? "").length;
};

// 如果传了 trigger，只执行匹配这个 trigger 的规则。
const shouldValidateByTrigger = (
  rule: FormRule,
  trigger?: FormValidateTrigger
) => {
  if (!trigger || !rule.trigger) {
    return true;
  }

  return Array.isArray(rule.trigger)
    ? rule.trigger.includes(trigger)
    : rule.trigger === trigger;
};

// 设置当前表单项为校验失败，并显示错误信息。
const setValidateError = (message?: string) => {
  validateState.value = "error";
  innerValidateMessage.value = message || "校验失败";
};

// 清空当前表单项的校验状态。
const clearValidate = () => {
  validateState.value = "";
  innerValidateMessage.value = "";
};

// 校验当前表单项。
const validate = async (trigger?: FormValidateTrigger) => {
  const rules = fieldRules.value.filter((rule) => {
    return shouldValidateByTrigger(rule, trigger);
  });

  if (!rules.length) {
    clearValidate();
    return true;
  }

  for (const rule of rules) {
    const value = fieldValue.value;

    if (rule.required && isEmptyValue(value)) {
      setValidateError(rule.message || `${props.label || props.prop || "该字段"}不能为空`);
      return false;
    }

    if (!isEmptyValue(value) && rule.min !== undefined && getValueLength(value) < rule.min) {
      setValidateError(rule.message || `长度不能小于 ${rule.min}`);
      return false;
    }

    if (!isEmptyValue(value) && rule.max !== undefined && getValueLength(value) > rule.max) {
      setValidateError(rule.message || `长度不能大于 ${rule.max}`);
      return false;
    }

    if (!isEmptyValue(value) && rule.pattern && !rule.pattern.test(String(value))) {
      setValidateError(rule.message || "格式不正确");
      return false;
    }

    if (rule.validator) {
      const result = await rule.validator(value);

      if (result !== true) {
        setValidateError(
          typeof result === "string" ? result : rule.message || "校验失败"
        );
        return false;
      }
    }
  }

  validateState.value = "success";
  innerValidateMessage.value = "";
  return true;
};

const formItemContext: FormItemContext = {
  prop: props.prop,
  validate,
  clearValidate
};

// 有 prop 的 form-item 才需要被 form 收集。
onMounted(() => {
  if (props.prop) {
    form?.addField(formItemContext);
  }
});

// 组件卸载时移除自己。
onBeforeUnmount(() => {
  form?.removeField(formItemContext);
});

// label 的样式。
const labelStyle = computed(() => {
  const width = form?.labelWidth;

  return {
    width: typeof width === "number" ? `${width}px` : width
  };
});

const formItemClass = computed(() => {
  return {
    [`keyment-form-item--label-${form?.labelPosition}`]: form?.labelPosition,
    "is-error": validateState.value === "error",
    "is-success": validateState.value === "success"
  };
});

defineExpose({
  validate,
  clearValidate
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
