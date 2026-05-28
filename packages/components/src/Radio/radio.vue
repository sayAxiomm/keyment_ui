<template>
  <!-- 
    label 是整个 Radio 的可点击区域。
    点击文字也能选中 radio。
  -->
  <label class="keyment-radio" :class="radioClass">
    <!-- 
      原生 radio input。
      真正负责表单选中行为的是它。
    -->
    <input
      class="keyment-radio__original"
      type="radio"
      :name="props.name"
      :value="props.label"
      :checked="isChecked"
      :disabled="props.disabled"
      @change="handleChange"
    />

    <!-- 自定义圆圈外观 -->
    <span class="keyment-radio__input">
      <span class="keyment-radio__inner"></span>
    </span>

    <!-- 默认插槽是显示文字。如果没传文字，就显示 label。 -->
    <span class="keyment-radio__label">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { RadioEmits, RadioProps } from "./radio";

defineOptions({
  name: "KyRadio"
});

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  border: false,
  size: "default"
});
// defineEmits 是 Vue <script setup> 里的宏，用来声明组件会触发的事件。
// 1. App.vue 有 gender = "male"
// 2. App.vue 使用 <ky-radio v-model="gender" label="female">
// 3. radio.vue 接收到 props.modelValue = "male"，props.label = "female"
// 4. 用户点击 radio
// 5. radio.vue 执行 emit("update:modelValue", "female")
// 6. App.vue 收到事件
// 7. Vue 把 gender 改成 "female"
// 8. radio.vue 再次收到新的 props.modelValue = "female"
// 9. radio.vue 判断 modelValue === label，所以显示选中
const emit = defineEmits<RadioEmits>();

// 当前 Radio 是否选中。
// 当外部 v-model 的值等于当前 Radio 的 label，就说明当前项被选中。
const isChecked = computed(() => props.modelValue === props.label);

const radioClass = computed(() => [
  `keyment-radio--${props.size}`,
  {
    "is-checked": isChecked.value,
    "is-disabled": props.disabled,
    "is-bordered": props.border
  }
]);

const handleChange = () => {
  if (props.disabled) {
    return;
  }

  // 选中当前 radio 时，把当前 label 通知给父组件。
  emit("update:modelValue", props.label);
  emit("change", props.label);
};
</script>

<style scoped>
.keyment-radio {
  display: inline-flex;
  align-items: center;
  margin-right: 24px;
  color: #606266;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  user-select: none;
}

.keyment-radio__original {
  position: absolute;
  opacity: 0;
  outline: none;
  z-index: -1;
}

.keyment-radio__input {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 50%;
  box-sizing: border-box;
  background: #ffffff;
}

.keyment-radio__inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #409eff;
  transform: scale(0);
  transition: transform 0.15s ease;
}

.keyment-radio__label {
  padding-left: 8px;
}

.keyment-radio.is-checked {
  color: #409eff;
}

.keyment-radio.is-checked .keyment-radio__input {
  border-color: #409eff;
}

.keyment-radio.is-checked .keyment-radio__inner {
  transform: scale(1);
}

.keyment-radio.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.keyment-radio.is-disabled .keyment-radio__input {
  border-color: #e4e7ed;
  background: #f5f7fa;
}

.keyment-radio.is-disabled .keyment-radio__inner {
  background: #c0c4cc;
}

.keyment-radio.is-bordered {
  height: 32px;
  padding: 0 15px 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
}

.keyment-radio.is-bordered.is-checked {
  border-color: #409eff;
}

.keyment-radio--small.is-bordered {
  height: 28px;
  padding: 0 12px 0 10px;
  font-size: 12px;
}

.keyment-radio--large.is-bordered {
  height: 40px;
  padding: 0 18px 0 14px;
  font-size: 16px;
}
</style>