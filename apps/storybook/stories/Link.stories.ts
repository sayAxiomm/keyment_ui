import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyLink } from "@keyment/components";
import { Promotion } from "@keyment/icons";

const meta: Meta<typeof KyLink> = {
  title: "基础组件/Link",
  component: KyLink,
  tags: ["autodocs"],
  args: {
    type: "primary",
    href: "#",
    underline: true,
    disabled: false
  },
  argTypes: {
    type: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger", "info"]
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { KyLink },
    setup() {
      return { args };
    },
    template: `<KyLink v-bind="args">示例链接</KyLink>`
  })
};

export const AllTypes: Story = {
  render: () => ({
    components: { KyLink },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:20px">
        <KyLink href="#">默认链接</KyLink>
        <KyLink type="primary" href="#">主要链接</KyLink>
        <KyLink type="success" href="#">成功链接</KyLink>
        <KyLink type="warning" href="#">警告链接</KyLink>
        <KyLink type="danger" href="#">危险链接</KyLink>
        <KyLink type="info" disabled>禁用链接</KyLink>
      </div>
    `
  })
};

export const WithIcon: Story = {
  render: () => ({
    components: { KyLink },
    setup() {
      return { Promotion };
    },
    template: `<KyLink type="primary" href="#" :icon="Promotion">访问详情</KyLink>`
  })
};
