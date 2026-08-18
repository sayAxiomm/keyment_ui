import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyCheckbox, KyCheckboxButton, KyCheckboxGroup } from "@keyment/components";
import { ref } from "vue";

const meta: Meta<typeof KyCheckboxGroup> = {
  title: "表单组件/Checkbox",
  component: KyCheckboxGroup,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => ({
    components: { KyCheckbox },
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template: `<KyCheckbox v-model="checked">同意用户协议（{{ checked ? "已同意" : "未同意" }}）</KyCheckbox>`
  })
};

export const Group: Story = {
  render: () => ({
    components: { KyCheckbox, KyCheckboxGroup },
    setup() {
      const hobbies = ref(["music"]);
      return { hobbies };
    },
    template: `
      <div style="display:grid;gap:16px">
        <KyCheckboxGroup v-model="hobbies" :min="1" :max="2">
          <KyCheckbox value="music">音乐</KyCheckbox>
          <KyCheckbox value="sport">运动</KyCheckbox>
          <KyCheckbox value="reading">阅读</KyCheckbox>
        </KyCheckboxGroup>
        <span>已选择：{{ hobbies.join("、") }}</span>
      </div>
    `
  })
};

export const ButtonStyle: Story = {
  render: () => ({
    components: { KyCheckboxButton, KyCheckboxGroup },
    setup() {
      const value = ref(["music"]);
      return { value };
    },
    template: `
      <KyCheckboxGroup v-model="value" fill="#409eff" text-color="#fff">
        <KyCheckboxButton value="music">音乐</KyCheckboxButton>
        <KyCheckboxButton value="sport">运动</KyCheckboxButton>
        <KyCheckboxButton value="reading">阅读</KyCheckboxButton>
      </KyCheckboxGroup>
    `
  })
};
