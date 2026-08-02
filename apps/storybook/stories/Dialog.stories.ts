import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyButton, KyDialog } from "@keyment/components";
import { ref } from "vue";

const meta: Meta<typeof KyDialog> = {
  title: "反馈组件/Dialog",
  component: KyDialog,
  tags: ["autodocs"],
  args: {
    title: "编辑资料",
    width: "min(520px, 90vw)",
    closeOnClickModal: true,
    closeOnPressEscape: true,
    showClose: true
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => ({
    components: { KyButton, KyDialog },
    setup() {
      const visible = ref(false);
      return { args, visible };
    },
    template: `
      <div>
        <KyButton type="primary" @click="visible = true">打开对话框</KyButton>
        <KyDialog v-model="visible" v-bind="args">
          这里可以放置表单或其他内容。
          <template #footer>
            <div style="display:flex;justify-content:flex-end;gap:12px">
              <KyButton @click="visible = false">取消</KyButton>
              <KyButton type="primary" @click="visible = false">确定</KyButton>
            </div>
          </template>
        </KyDialog>
      </div>
    `
  })
};

export const NoModalClose: Story = {
  args: {
    title: "重要操作",
    closeOnClickModal: false,
    closeOnPressEscape: false
  },
  render: Basic.render!
};
