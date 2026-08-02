import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyInput } from "@keyment/components";
import { Search } from "@keyment/icons";
import { ref } from "vue";

const meta: Meta<typeof KyInput> = {
  title: "表单组件/Input",
  component: KyInput,
  tags: ["autodocs"],
  args: {
    placeholder: "请输入内容",
    type: "text",
    size: "default",
    clearable: true,
    disabled: false,
    readonly: false
  },
  argTypes: {
    type: { control: "select", options: ["text", "password", "textarea"] },
    size: { control: "select", options: ["large", "default", "small"] }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { KyInput },
    setup() {
      const value = ref("");
      return { args, value };
    },
    template: `
      <div style="width:360px">
        <KyInput v-model="value" v-bind="args" />
        <p style="color:#909399">当前输入：{{ value || "暂无内容" }}</p>
      </div>
    `
  })
};

export const Password: Story = {
  render: () => ({
    components: { KyInput },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `<KyInput v-model="value" type="password" show-password clearable placeholder="请输入密码" style="width:360px" />`
  })
};

export const WithIconAndLimit: Story = {
  render: () => ({
    components: { KyInput },
    setup() {
      const value = ref("");
      return { value, Search };
    },
    template: `<KyInput v-model="value" :prefix-icon="Search" :maxlength="20" show-word-limit clearable placeholder="搜索内容" style="width:360px" />`
  })
};

export const Textarea: Story = {
  render: () => ({
    components: { KyInput },
    setup() {
      const value = ref("");
      return { value };
    },
    template: `<KyInput v-model="value" type="textarea" :rows="4" :maxlength="100" show-word-limit placeholder="请输入个人介绍" style="width:420px" />`
  })
};
