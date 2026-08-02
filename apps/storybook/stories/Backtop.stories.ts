import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyBacktop } from "@keyment/components";

const meta: Meta<typeof KyBacktop> = {
  title: "反馈组件/Backtop",
  component: KyBacktop,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    visibilityHeight: 120,
    right: 32,
    bottom: 32
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => ({
    components: { KyBacktop },
    setup() {
      return { args };
    },
    template: `
      <div style="min-height:1400px;padding:32px;background:linear-gradient(#fff,#ecf5ff)">
        <h3>向下滚动页面</h3>
        <p>滚动超过 {{ args.visibilityHeight }}px 后，右下角会出现回到顶部按钮。</p>
        <KyBacktop v-bind="args">↑</KyBacktop>
      </div>
    `
  })
};

export const CustomContent: Story = {
  args: {
    visibilityHeight: 80,
    right: 48,
    bottom: 48
  },
  render: (args) => ({
    components: { KyBacktop },
    setup() {
      return { args };
    },
    template: `
      <div style="min-height:1200px;padding:32px">
        <p>向下滚动查看自定义内容。</p>
        <KyBacktop v-bind="args">顶部</KyBacktop>
      </div>
    `
  })
};
