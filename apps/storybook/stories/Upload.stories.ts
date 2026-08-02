import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyUpload } from "@keyment/components";

const meta: Meta<typeof KyUpload> = {
  title: "表单组件/Upload",
  component: KyUpload,
  tags: ["autodocs"],
  args: {
    autoUpload: false,
    multiple: false,
    disabled: false,
    showFileList: true,
    limit: 3
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => ({
    components: { KyUpload },
    setup() {
      return { args };
    },
    template: `
      <div style="display:grid;gap:12px">
        <KyUpload v-bind="args" accept="image/*">选择图片</KyUpload>
        <small style="color:#909399">演示环境关闭自动上传，文件不会发送到服务器。</small>
      </div>
    `
  })
};

export const Multiple: Story = {
  render: () => ({
    components: { KyUpload },
    template: `<KyUpload :auto-upload="false" multiple :limit="3" accept="image/*">选择多张图片</KyUpload>`
  })
};

export const Drag: Story = {
  render: () => ({
    components: { KyUpload },
    template: `
      <KyUpload drag multiple :auto-upload="false" :limit="5">
        将文件拖到这里，或点击选择
      </KyUpload>
    `
  })
};
