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
      :class="{ 
        'is-disabled': props.disabled,
        'is-drag': props.drag,
        'is-dragover': isDragover
       }"
      @click="handleClick"
      @dragover.prevent="handleDragover"
      @dragleave.prevent="handleDragleave"
      @drop.prevent="handleDrop"
    >
      <slot>点击上传</slot>
    </div>
    <!-- 有多选的时候 -->
    <ul
      v-if="props.showFileList &&uploadFiles.length"
      class="keyment-upload__list"
      >
      <li
        v-for="file in uploadFiles"
        :key="file.name"
        class="keyment-upload__item"
        :class="`is-${file.status}`"
        >
          <span class="keyment-upload__name">
            {{ file.name }}
          </span>
          <span class="keyment-upload__status">
            {{ getStatusText(file.status) }}
          </span>
          <button
            class="keyment-upload__remove"
            type="button"
            @click="handleRemove(file)"
            >
            x
          </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { UploadEmits, UploadFile, UploadProps,UploadStatus } from "./upload";

defineOptions({
  name: "KyUpload"
});

const props = withDefaults(defineProps<UploadProps>(), {
  disabled: false,
  multiple: false,
  name: "file",
  method: "post",
  autoUpload: true,
  showFileList: true,
  drag: false
});

const emit = defineEmits<UploadEmits>();

const inputRef = ref<HTMLInputElement>();
// 组件内部保存的文件列表，用来后面渲染文件列表。
const uploadFiles = ref<UploadFile[]>([]);
// 拖拽状态
const isDragover = ref(false);


// 这个方法绑定在我们自己画的上传按钮上，我们会把input的默认隐藏 因为不好控制，
// 用户点击自己画的掉这个函数 ，然后这里面获取上传的dom 然后用函数进行点击
const handleClick = () => {
  if (props.disabled) {
    return;
  }

  inputRef.value?.click();  // 用代码帮用户点了一下这个原生 input。
};

// 用户在系统文件窗口里选完文件后，
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const fileList = target.files;

  if (!fileList) {
    return;
  }

  handleFiles(Array.from(fileList));

  target.value = "";
};

// 统一处理用户选择或拖拽进来的原生文件。
// 把浏览器给的文件列表整理成我们自己的 UploadFile[]，再通知外面
const handleFiles = (rawFiles: File[]) => {
  if (props.limit && uploadFiles.value.length + rawFiles.length > props.limit) {
    emit("exceed", rawFiles, uploadFiles.value);
    return;
  }

  const files: UploadFile[] = rawFiles.map((file) => {
    return {
      raw: file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "ready"
    };
  });

  uploadFiles.value = props.multiple ? [...uploadFiles.value, ...files] : files;

  emit("change", uploadFiles.value);

  if (props.autoUpload) {
    files.forEach((file) => {
      uploadFile(file);
    });
  }
};

// 文件拖进上传区域时，切换拖拽样式。
const handleDragover = () => {
  if (props.disabled || !props.drag) {
    return;
  }

  isDragover.value = true;
};

// 文件离开上传区域时，取消拖拽样式。
const handleDragleave = () => {
  isDragover.value = false;
};

// 文件拖放到上传区域时，读取文件并走统一上传逻辑。
const handleDrop = (event: DragEvent) => {
  if (props.disabled || !props.drag) {
    return;
  }

  isDragover.value = false;

  const fileList = event.dataTransfer?.files;

  if (!fileList) {
    return;
  }

  handleFiles(Array.from(fileList));
};

// 手动上传文件列表中还没有上传的文件。
const submit = () => {
  uploadFiles.value.forEach((file) => {
    uploadFile(file);
  });
};
// 清空文件列表。
const clearFiles = () => {
  uploadFiles.value = [];
  emit("change", uploadFiles.value);
};
// submit方法暴露出,组件实例的方法 
defineExpose({
  submit,
  clearFiles
});

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
  file.status = "uploading";
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
  file.status = "success";
  props.onSuccess?.(result, file);
  emit("success", result, file);
} catch (error) {
  file.status = "error";
  props.onError?.(error, file);
  emit("error", error, file);
}
};

// 从文件列表中移除某个文件。
const handleRemove = (file: UploadFile) => {
  uploadFiles.value = uploadFiles.value.filter((item) => {
    return item !== file;
  });

  props.onRemove?.(file, uploadFiles.value);
  emit("remove", file, uploadFiles.value);
  emit("change", uploadFiles.value);
};

// 根据文件状态显示对应文本。
const getStatusText = (status: UploadStatus) => {
  const statusMap: Record<UploadStatus, string> = {
    ready: "待上传",
    uploading: "上传中",
    success: "成功",
    error: "失败"
  };

  return statusMap[status];
};
</script>

<style scoped>
.keyment-upload {
  display: block;
  width: 100%;
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
.keyment-upload__list {
  width: 100%;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
}

.keyment-upload__item {
  height: 28px;
  color: #606266;
  font-size: 14px;
  line-height: 28px;
}
.keyment-upload__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 28px;
  padding: 0 8px;
  border-radius: 4px;
  box-sizing: border-box;
  color: #606266;
  font-size: 12px;
  line-height: 28px;
}
.keyment-upload__item:hover{
  background: #f5f7fa;
  color: #409eff;
  cursor: pointer;
}

.keyment-upload__name {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.keyment-upload__remove {
  flex: none;
  border: none;
  background: transparent;
  color: #909399;
  cursor: pointer;
}

.keyment-upload__remove:hover {
  color: #f56c6c;
}
.keyment-upload__status {
  flex: none;
  color: #909399;
  font-size: 12px;
}
.keyment-upload__item.is-success {
  color: #67c23a;
}

.keyment-upload__item.is-error {
  color: #f56c6c;
}
.keyment-upload__trigger.is-drag {
  width: 360px;
  height: 160px;
  border-style: dashed;
  color: #909399;
}

.keyment-upload__trigger.is-dragover {
  border-color: #409eff;
  background: #ecf5ff;
  color: #409eff;
}
</style>
