import type { Meta, StoryObj } from "@storybook/vue3-vite";
import {
  KyAside,
  KyContainer,
  KyFooter,
  KyHeader,
  KyMain
} from "@keyment/components";

const meta: Meta<typeof KyContainer> = {
  title: "布局组件/Container",
  component: KyContainer,
  tags: ["autodocs"],
  parameters: { layout: "padded" }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { KyAside, KyContainer, KyFooter, KyHeader, KyMain },
    template: `
      <KyContainer style="height:320px;border:1px solid #dcdfe6">
        <KyHeader style="display:grid;place-items:center;background:#d9ecff">Header</KyHeader>
        <KyContainer>
          <KyAside width="150px" style="display:grid;place-items:center;background:#ecf5ff">Aside</KyAside>
          <KyMain style="display:grid;place-items:center">Main</KyMain>
        </KyContainer>
        <KyFooter style="display:grid;place-items:center;background:#d9ecff">Footer</KyFooter>
      </KyContainer>
    `
  })
};

export const Horizontal: Story = {
  render: () => ({
    components: { KyAside, KyContainer, KyMain },
    template: `
      <KyContainer direction="horizontal" style="height:220px;border:1px solid #dcdfe6">
        <KyAside width="180px" style="display:grid;place-items:center;background:#ecf5ff">导航区域</KyAside>
        <KyMain style="display:grid;place-items:center">内容区域</KyMain>
      </KyContainer>
    `
  })
};
