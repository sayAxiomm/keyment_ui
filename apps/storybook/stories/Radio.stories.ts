import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyRadio, KyRadioButton, KyRadioGroup } from "@keyment/components";
import { ref } from "vue";

const meta: Meta<typeof KyRadioGroup> = {
  title: "表单组件/Radio",
  component: KyRadioGroup,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { KyRadio, KyRadioGroup },
    setup() {
      const city = ref("shanghai");
      return { city };
    },
    template: `
      <div style="display:grid;gap:16px">
        <KyRadioGroup v-model="city">
          <KyRadio value="beijing">北京</KyRadio>
          <KyRadio value="shanghai">上海</KyRadio>
          <KyRadio value="guangzhou">广州</KyRadio>
        </KyRadioGroup>
        <span>当前选择：{{ city }}</span>
      </div>
    `
  })
};

export const WithBorder: Story = {
  render: () => ({
    components: { KyRadio, KyRadioGroup },
    setup() {
      const value = ref("A");
      return { value };
    },
    template: `
      <KyRadioGroup v-model="value" border size="large">
        <KyRadio value="A">选项 A</KyRadio>
        <KyRadio value="B">选项 B</KyRadio>
        <KyRadio value="C" disabled>禁用项</KyRadio>
      </KyRadioGroup>
    `
  })
};

export const ButtonStyle: Story = {
  render: () => ({
    components: { KyRadioButton, KyRadioGroup },
    setup() {
      const size = ref("medium");
      return { size };
    },
    template: `
      <KyRadioGroup v-model="size" fill="#67c23a" text-color="#fff">
        <KyRadioButton value="small">小型</KyRadioButton>
        <KyRadioButton value="medium">中型</KyRadioButton>
        <KyRadioButton value="large">大型</KyRadioButton>
      </KyRadioGroup>
    `
  })
};
