import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyBreadcrumb, KyBreadcrumbItem } from "@keyment/components";

const meta: Meta<typeof KyBreadcrumb> = {
  title: "导航组件/Breadcrumb",
  component: KyBreadcrumb,
  tags: ["autodocs"],
  args: {
    separator: "/"
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => ({
    components: { KyBreadcrumb, KyBreadcrumbItem },
    setup() {
      return { args };
    },
    template: `
      <KyBreadcrumb v-bind="args">
        <KyBreadcrumbItem>首页</KyBreadcrumbItem>
        <KyBreadcrumbItem>组件</KyBreadcrumbItem>
        <KyBreadcrumbItem>Breadcrumb 面包屑</KyBreadcrumbItem>
      </KyBreadcrumb>
    `
  })
};

export const CustomSeparator: Story = {
  args: { separator: ">" },
  render: Basic.render!
};

export const WithLinks: Story = {
  render: () => ({
    components: { KyBreadcrumb, KyBreadcrumbItem },
    template: `
      <KyBreadcrumb separator="→">
        <KyBreadcrumbItem to="/">首页</KyBreadcrumbItem>
        <KyBreadcrumbItem to="/components">组件</KyBreadcrumbItem>
        <KyBreadcrumbItem>当前页面</KyBreadcrumbItem>
      </KyBreadcrumb>
    `
  })
};
