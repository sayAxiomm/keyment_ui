<template>
  <div class="keyment-upload">
    <input
      ref="inputRef"
      class="keyment-upload__input"
      type="file"
      :name="props.name"
      :accept="props.accept"
      :multiple="props.multiple"
      :disabled="props.disabled"
      @change="handleChange"
    />

    <div
      class="keyment-upload__trigger"
      :class="{ 'is-disabled': props.disabled }"
      @click="handleClick"
    >
      <slot>点击上传</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UploadEmits, UploadFile, UploadProps } from "./upload";

defineOptions({
  name: "KyUpload"
});

const props = withDefaults(defineProps<UploadProps>(), {
  disabled: false,
  multiple: false,
  name: "file",
  method: "post"
});

const emit = defineEmits<UploadEmits>();

const inputRef = ref<HTMLInputElement>();

// 这个方法绑定在我们自己画的上传按钮上，我们会把input的默认隐藏 因为不好控制，
// 用户点击自己画的掉这个函数 ，然后这里面获取上传的dom 然后用函数进行点击
const handleClick = () => {
  if (props.disabled) {
    return;
  }

  inputRef.value?.click();  // 用代码帮用户点了一下这个原生 input。
};

// 用户在系统文件窗口里选完文件后，
// 把浏览器给的文件列表整理成我们自己的 UploadFile[]，再通知外面
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const fileList = target.files;

  if (!fileList) {
    return;
  }

  const files: UploadFile[] = Array.from(fileList).map((file) => {
    return {
      raw: file,
      name: file.name,
      size: file.size,
      type: file.type
    };
  });

  emit("change", files);
  // 调用上传的函数
  files.forEach((file) => {
  uploadFile(file);
});
};

// 把选择的文件上传到porps.action这个路径
const uploadFile = async (file: UploadFile) => {
  if (!props.action) {
    return;
  }
  // 上传前的判断
  if (props.beforeUpload) {
    const canUpload = await props.beforeUpload(file);

    if (!canUpload) {
      return;
    }
  }
  const formData = new FormData();

  formData.append(props.name, file.raw);

// 文件信息进行组装
  if (props.data) {
    Object.keys(props.data).forEach((key) => {
      formData.append(key, String(props.data![key]));
    });
  }
  const requestOptions: RequestInit = {
    method: props.method.toUpperCase(),
    body: formData
  };

  if (props.headers) {
    requestOptions.headers = props.headers;
  }
// 这里才是真正上传
  try {
  const response = await fetch(props.action, requestOptions);

  const result = await response.json().catch(() => {
    return response.text();
  });

  if (!response.ok) {
    throw result;
  }

  props.onSuccess?.(result, file);
} catch (error) {
  props.onError?.(error, file);
}
};
</script>

<style scoped>
.keyment-upload {
  display: inline-block;
}

.keyment-upload__input {
  display: none;
}

.keyment-upload__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  height: 32px;
  padding: 0 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ffffff;
  color: #606266;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.keyment-upload__trigger:hover {
  border-color: #409eff;
  color: #409eff;
}

.keyment-upload__trigger.is-disabled {
  color: #a8abb2;
  border-color: #e4e7ed;
  background: #f5f7fa;
  cursor: not-allowed;
}
</style>