import type {
  Meta,
  StoryObj
} from "@storybook/vue3-vite";
import {
  KyButton,
  KyButtonGroup
} from "@keyment/components";

const meta: Meta<typeof KyButton> = {
  title: "基础组件/Button",
  component: KyButton,
  tags: ["autodocs"],

  argTypes: {
    type: {
      control: "select",
      options: [
        "default",
        "primary",
        "success",
        "warning",
        "danger",
        "info"
      ]
    },
    size: {
      control: "select",
      options: ["small", "default", "large"]
    }
  },

  args: {
    type: "default",
    size: "default",
    disabled: false,
    loading: false,
    plain: false,
    round: false
  },

  render: (args) => ({
    components: {
      KyButton
    },
    setup() {
      return {
        args
      };
    },
    template: `
      <KyButton v-bind="args">
        示例按钮
      </KyButton>
    `
  })
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    type: "primary"
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const Loading: Story = {
  args: {
    type: "primary",
    loading: true
  }
};

export const Round: Story = {
  args: {
    type: "primary",
    round: true
  }
};

export const AllTypes: Story = {
  render: () => ({
    components: { KyButton },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px">
        <KyButton>默认按钮</KyButton>
        <KyButton type="primary">主要按钮</KyButton>
        <KyButton type="success">成功按钮</KyButton>
        <KyButton type="warning">警告按钮</KyButton>
        <KyButton type="danger">危险按钮</KyButton>
        <KyButton type="info">信息按钮</KyButton>
      </div>
    `
  })
};

export const ButtonGroup: Story = {
  render: () => ({
    components: {
      KyButton,
      KyButtonGroup
    },
    template: `
      <div style="display:flex;align-items:flex-start;gap:24px">
        <KyButtonGroup>
          <KyButton>上一页</KyButton>
          <KyButton type="primary">当前页</KyButton>
          <KyButton>下一页</KyButton>
        </KyButtonGroup>
        <KyButtonGroup direction="vertical">
          <KyButton>上</KyButton>
          <KyButton>中</KyButton>
          <KyButton>下</KyButton>
        </KyButtonGroup>
      </div>
    `
  })
};
