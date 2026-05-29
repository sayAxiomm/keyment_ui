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
      :name="actualName"
      :value="props.value"
      :checked="isChecked"
      :disabled="actualDisabled"
      @change="handleChange"
    />

    <!-- 自定义圆圈外观
     因为原生 radio 样式很难统一修改，所以组件库一般会
     把原生 input 隐藏，只保留它的功能，再用 span 画好看的 UI。 
     -->
    <span class="keyment-radio__input">
      <span class="keyment-radio__inner"></span>
    </span>

    <!-- 默认插槽是显示文字。如果没传文字，就显示 value。 -->
    <span class="keyment-radio__label">
      <slot>{{ props.value }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed ,inject} from "vue";
import type { RadioEmits, RadioProps,RadioGroupContext } from "./radio";

defineOptions({
  name: "KyRadio"
});

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  border: false,
  size: "default"
});

// 这里接受radio-group给的数据
const radioGroup = inject<RadioGroupContext>("radioGroup")||undefined

// 判断当前 KyRadio 是否处在 KyRadioGroup 里面
const isGroup = computed(() => !!radioGroup);

// 单独使用：用 props.xxx
// 放在 group 里：优先用 radioGroup.xxx
const actualModelValue = computed(() => {
  return isGroup.value ? radioGroup?.modelValue : props.modelValue;
});
const actualDisabled = computed(() => {
  return radioGroup?.disabled || props.disabled;
});
const actualBorder = computed(() => {
  return radioGroup?.border || props.border;
});
const actualSize = computed(() => {
  return radioGroup?.size || props.size;
});
const actualName = computed(() => {
  return radioGroup?.name || props.name;
});



// defineEmits 是 Vue <script setup> 里的宏，用来声明组件会触发的事件。
// 1. App.vue 有 gender = "male"
// 2. App.vue 使用 <ky-radio v-model="gender" value="female">
// 3. radio.vue 接收到 props.modelValue = "male"，props.value = "female"
// 4. 用户点击 radio
// 5. radio.vue 执行 emit("update:modelValue", "female")
// 6. App.vue 收到事件
// 7. Vue 把 gender 改成 "female"
// 8. radio.vue 再次收到新的 props.modelValue = "female"
// 9. radio.vue 判断 modelValue === value，所以显示选中
const emit = defineEmits<RadioEmits>();

// 当前 Radio 是否选中。
// 当外部 v-model 的值等于当前 Radio 的 value，就说明当前项被选中。
const isChecked = computed(() => actualModelValue.value === props.value);

const radioClass = computed(() => [
  `keyment-radio--${actualSize.value}`,
  {
    "is-checked": isChecked.value,
    "is-disabled": actualDisabled.value,
    "is-bordered": actualBorder.value
  }
]);

// 假设父组件这样写：<ky-radio @change="() => console.log(1)" />
// 这个 @change 不是直接绑到组件内部的 input 上。
// 它监听的是 KyRadio 这个组件自己抛出的 change 事件。

// 用户点击 KyRadio
// 实际被点击的是 KyRadio 里面的 input
// input 触发原生 change
// input 上的 @change="handleChange" 执行
// handleChange 里面调用：
//    emit("change")
// Vue 发现父组件监听了 KyRadio 的 change
// 也就是:如果 KyRadio 这个组件内部发出了一个叫 change 的事件，
//  那就执行 handleRadioChange。
// 执行父组件传进来的函数：


// 用户点击
// -> 原生 input 自己真的发生 change
// -> input 的 @change 执行 radio.vue 的 handleChange
// -> handleChange 里 emit("change", props.value)
// -> App.vue 的 @change="handleRadioChange" 执行
const handleChange = () => {
  if (actualDisabled.value) {
    return;
  }

  if (isGroup.value) {
    radioGroup?.changeEvent(props.value);
    return;
  }

  // 单独使用时，选中当前 radio 后直接通知父组件。
  emit("update:modelValue", props.value);
  // 这里写select那父组件就要写<ky-radio @select="onChange" />
  emit("change", props.value);
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
