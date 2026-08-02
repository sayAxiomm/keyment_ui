import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyIcon } from "@keyment/components";
import { Check, Plus, Search, Setting } from "@keyment/icons";

const meta: Meta<typeof KyIcon> = {
  title: "基础组件/Icon",
  component: KyIcon,
  tags: ["autodocs"],
  args: {
    size: 28,
    color: "#409eff"
  },
  argTypes: {
    size: { control: "text" },
    color: { control: "color" }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { KyIcon, Search },
    setup() {
      return { args };
    },
    template: `<KyIcon v-bind="args"><Search /></KyIcon>`
  })
};

export const Gallery: Story = {
  render: () => ({
    components: { KyIcon, Check, Plus, Search, Setting },
    template: `
      <div style="display:flex;gap:24px;align-items:center">
        <KyIcon :size="24"><Plus /></KyIcon>
        <KyIcon :size="28" color="#409eff"><Search /></KyIcon>
        <KyIcon :size="32" color="#67c23a"><Check /></KyIcon>
        <KyIcon size="2rem" color="#e6a23c"><Setting /></KyIcon>
      </div>
    `
  })
};
