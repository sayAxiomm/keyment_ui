<template>
  <!-- 
    CheckboxGroup 的外层容器。
    用来包住一组 KyCheckbox。
  -->
  <div class="keyment-checkbox-group" role="group">
    <!-- 
      默认插槽。
      外部写在 <ky-checkbox-group> 里面的 <ky-checkbox> 会渲染到这里。
    -->
    <slot />
  </div>
</template>
<script setup lang="ts">
import { inject, nextTick, provide } from "vue";
import type {
  CheckboxGroupContext,
  CheckboxGroupEmits,
  CheckboxGroupProps,
  CheckboxValue
} from "./checkbox";
import type { FormItemContext } from "../Form/form";

defineOptions({
  name: "KyCheckboxGroup"
});

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  disabled: false,
  border: false,
  size: "default",
  validateEvent: true
});

const emit = defineEmits<CheckboxGroupEmits>();
const formItem = inject<FormItemContext>("formItem");
  

// checkbox变化通知group的函数
// RadioGroup：点击后直接把 modelValue 改成某一个值
// CheckboxGroup：点击后要往数组里添加或移除某一个值
function changeEvent(value: CheckboxValue) {
  const modelValue = props.modelValue ?? [];

  const isSelected = modelValue.includes(value);

  // 如果已经选中，点击是取消
  if (isSelected) {
    // 如果设置了 min，并且当前数量已经小于等于 min，就不允许继续取消
    if (props.min !== undefined && modelValue.length <= props.min) {
      return;
    }

    const nextValue = modelValue.filter((item) => item !== value);
    emit("update:modelValue", nextValue);
    emit("change", nextValue);
    if (props.validateEvent) {
      nextTick(() => {
        formItem?.validate("change");
      });
    }
    return;
  }

  // 如果没有选中，点击是新增
  // 如果设置了 max，并且当前数量已经大于等于 max，就不允许继续新增
  if (props.max !== undefined && modelValue.length >= props.max) {
    return;
  }

  const nextValue = [...modelValue, value];
  emit("update:modelValue", nextValue);
  emit("change", nextValue);
  if (props.validateEvent) {
    nextTick(() => {
      formItem?.validate("change");
    });
  }
}
provide("checkboxGroup", {
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
  get min() {
    return props.min;
  },
  get max() {
    return props.max;
  },
  get textColor() {
    return props.textColor;
  },
  get fill() {
    return props.fill;
  },
  get validateEvent() {
    return props.validateEvent;
  },
  changeEvent
});
</script>

<style scoped>
.keyment-checkbox-group {
  display: inline-flex;
  align-items: center;
}
</style>
