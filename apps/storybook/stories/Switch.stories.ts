import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KySwitch } from "@keyment/components";
import { ref } from "vue";

const meta: Meta<typeof KySwitch> = {
  title: "表单组件/Switch",
  component: KySwitch,
  tags: ["autodocs"],
  args: {
    modelValue: false,
    size: "default",
    disabled: false,
    loading: false,
    width: 48
  },
  argTypes: {
    size: { control: "select", options: ["large", "default", "small"] }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { KySwitch },
    setup() {
      const enabled = ref(false);
      return { enabled };
    },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <KySwitch v-model="enabled" active-text="开" inactive-text="关" />
        <span>当前状态：{{ enabled ? "开启" : "关闭" }}</span>
      </div>
    `
  })
};

export const CustomValues: Story = {
  render: () => ({
    components: { KySwitch },
    setup() {
      const value = ref("disabled");
      return { value };
    },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <KySwitch v-model="value" active-value="enabled" inactive-value="disabled" active-color="#13ce66" inactive-color="#ff4949" />
        <span>{{ value }}</span>
      </div>
    `
  })
};

export const States: Story = {
  render: () => ({
    components: { KySwitch },
    template: `
      <div style="display:flex;gap:20px;align-items:center">
        <KySwitch :model-value="true" inline-prompt active-text="开" inactive-text="关" />
        <KySwitch :model-value="false" disabled />
        <KySwitch :model-value="true" loading />
      </div>
    `
  })
};
