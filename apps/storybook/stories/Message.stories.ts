import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyButton, KyMessage } from "@keyment/components";

const meta: Meta = {
  title: "反馈组件/Message",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "通过 KyMessage 方法创建全局消息提示。"
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const Types: Story = {
  render: () => ({
    components: { KyButton },
    setup() {
      const showMessage = (type: "success" | "warning" | "info" | "error") => {
        KyMessage[type]({
          message: `${type} 类型的消息提示`,
          showClose: true
        });
      };
      return { showMessage };
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px">
        <KyButton type="success" @click="showMessage('success')">成功</KyButton>
        <KyButton type="warning" @click="showMessage('warning')">警告</KyButton>
        <KyButton type="info" @click="showMessage('info')">消息</KyButton>
        <KyButton type="danger" @click="showMessage('error')">错误</KyButton>
      </div>
    `
  })
};

export const Persistent: Story = {
  render: () => ({
    components: { KyButton },
    setup() {
      const show = () => {
        KyMessage({
          message: "这条消息不会自动关闭，请点击关闭按钮。",
          duration: 0,
          showClose: true
        });
      };
      return { show };
    },
    template: `<KyButton type="primary" @click="show">显示常驻消息</KyButton>`
  })
};
