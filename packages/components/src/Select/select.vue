<template>
  <div
    ref="selectRef"
    class="keyment-select"
    :class="selectClass"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <!-- 选择器输入区域：点击后打开或关闭下拉面板 -->
    <div
      class="keyment-select__wrapper"
      @click="handleToggle"
    >
      <input
        v-if="!props.multiple"
        class="keyment-select__inner"
        type="text"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="true"
        :value="displayLabel"
      />

      <div
        v-else
        class="keyment-select__tags"
      >
        <span
          v-if="!selectedOptions.length"
          class="keyment-select__placeholder"
        >
          {{ props.placeholder }}
        </span>

        <span
          v-for="option in selectedOptions"
          :key="String(option.value)"
          class="keyment-select__tag"
        >
          {{ option.label }}

          <button
            class="keyment-select__tag-close"
            type="button"
            @click.stop="removeSelectedOption(option)"
          >
            x
          </button>
        </span>
      </div>

      <button
        v-if="showClear"
        class="keyment-select__clear"
        type="button"
        @click.stop="handleClear"
      >
        x
      </button>

      <span
        v-else
        class="keyment-select__arrow"
        :class="{ 'is-open': dropdownVisible }"
      >
        <ArrowDown />
      </span>
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
import { computed, onBeforeUnmount, onMounted, provide,ref } from "vue";
import type { SelectEmits, SelectProps,SelectContext , SelectOption} from "./select";
import { ArrowDown } from "@keyment/icons";

defineOptions({
  name: "KySelect"
});



const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: "请选择",
  disabled: false,
  clearable: false,
  size: "default",
  multiple: false
});

const emit = defineEmits<SelectEmits>();

const selectRef = ref<HTMLElement>();

// 下拉面板是否显示。
const dropdownVisible = ref(false);
// 当前选中项显示在输入框里的文本。
const selectedLabel = ref("");
// 多选时保存选中项，用来渲染输入框里的小标签。
const selectedOptions = ref<SelectOption[]>([]);
// 鼠标是否停留在 select 上，用来控制清空按钮显示。
const isHovering = ref(false);

// select 的 class。
const selectClass = computed(() => {
  return {
    [`keyment-select--${props.size}`]: props.size
  };
});

// 是否显示清空按钮。
const showClear = computed(() => {
  if (!props.clearable || props.disabled || !isHovering.value) {
    return false;
  }

  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length > 0;
  }

  return props.modelValue !== undefined && props.modelValue !== "";
});

// 输入框里显示的文本。
const displayLabel = computed(() => {
  if (props.multiple) {
    return "";
  }

  return selectedLabel.value;
});

// 点击选择器时，打开或关闭下拉面板。
const handleToggle = () => {
  if (props.disabled) {
    return;
  }

  dropdownVisible.value = !dropdownVisible.value;
};

// 选中某个 option。
const selectOption = (option: SelectOption) => {
  if (option.disabled) {
    return;
  }

  if (props.multiple) {
    const modelValue = Array.isArray(props.modelValue) ? props.modelValue : [];
    const selectedIndex = modelValue.findIndex((value) => {
      return value === option.value;
    });

    const nextValue =
      selectedIndex > -1
        ? modelValue.filter((value) => value !== option.value)
        : [...modelValue, option.value];

    selectedOptions.value =
      selectedIndex > -1
        ? selectedOptions.value.filter((item) => item.value !== option.value)
        : [...selectedOptions.value, option];

    emit("update:modelValue", nextValue);
    emit("change", nextValue);
    return;
  }

  selectedLabel.value = option.label;
  emit("update:modelValue", option.value);
  emit("change", option.value);

  dropdownVisible.value = false;
};

// 清空当前选中值。
const handleClear = () => {
  selectedLabel.value = "";
  selectedOptions.value = [];
  dropdownVisible.value = false;

  const value = props.multiple ? [] : undefined;

  emit("update:modelValue", value);
  emit("change", value);
  emit("clear");
};

// 移除某一个多选标签。
const removeSelectedOption = (option: SelectOption) => {
  const modelValue = Array.isArray(props.modelValue) ? props.modelValue : [];
  const nextValue = modelValue.filter((value) => {
    return value !== option.value;
  });

  selectedOptions.value = selectedOptions.value.filter((item) => {
    return item.value !== option.value;
  });

  emit("update:modelValue", nextValue);
  emit("change", nextValue);
};
// 传递
provide<SelectContext>("select", {
  get modelValue() {
    return props.modelValue;
  },
  get multiple() {
    return props.multiple;
  },
  selectOption
});

// 点击页面其他地方时，关闭下拉面板。
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;

  if (!selectRef.value) {
    return;
  }

  if (!selectRef.value.contains(target)) {
    dropdownVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

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

.keyment-select--large .keyment-select__inner {
  height: 40px;
  font-size: 14px;
  line-height: 40px;
}

.keyment-select--small .keyment-select__inner {
  height: 24px;
  font-size: 12px;
  line-height: 24px;
}

.keyment-select__inner:disabled {
  color: #a8abb2;
  background: #f5f7fa;
  cursor: not-allowed;
}

.keyment-select__tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-height: 32px;
  padding: 3px 32px 3px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  cursor: pointer;
}

.keyment-select--large .keyment-select__tags {
  min-height: 40px;
}

.keyment-select--small .keyment-select__tags {
  min-height: 24px;
  padding-top: 2px;
  padding-bottom: 2px;
}

.keyment-select__placeholder {
  color: #a8abb2;
  font-size: 14px;
}

.keyment-select--small .keyment-select__placeholder {
  font-size: 12px;
}

.keyment-select__tag {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 22px;
  padding: 0 6px;
  border-radius: 4px;
  box-sizing: border-box;
  background: #f4f4f5;
  color: #606266;
  font-size: 12px;
  line-height: 22px;
}

.keyment-select__tag-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin-left: 4px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #909399;
  font-size: 12px;
  cursor: pointer;
}

.keyment-select__tag-close:hover {
  background: #c0c4cc;
  color: #ffffff;
}

.keyment-select__arrow {
  position: absolute;
  top: 50%;
  right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  color: #a8abb2;
  pointer-events: none;
  transform: translateY(-50%);
  transition: transform 0.2s;
}

.keyment-select__arrow.is-open {
  transform: translateY(-50%) rotate(180deg);
}

.keyment-select__arrow :deep(svg) {
  width: 1em;
  height: 1em;
}

.keyment-select__clear {
  position: absolute;
  top: 50%;
  right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #c0c4cc;
  color: #ffffff;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  transform: translateY(-50%);
}

.keyment-select__clear:hover {
  background: #909399;
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
