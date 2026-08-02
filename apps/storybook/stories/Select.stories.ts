import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyOption, KySelect } from "@keyment/components";
import { ref } from "vue";

const meta: Meta<typeof KySelect> = {
  title: "表单组件/Select",
  component: KySelect,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { KyOption, KySelect },
    setup() {
      const city = ref("");
      return { city };
    },
    template: `
      <div style="display:grid;gap:14px;width:360px">
        <KySelect v-model="city" clearable placeholder="请选择城市">
          <KyOption label="北京" value="beijing" />
          <KyOption label="上海" value="shanghai" />
          <KyOption label="广州" value="guangzhou" />
          <KyOption label="深圳（不可选）" value="shenzhen" disabled />
        </KySelect>
        <span>当前选择：{{ city || "暂无" }}</span>
      </div>
    `
  })
};

export const Multiple: Story = {
  render: () => ({
    components: { KyOption, KySelect },
    setup() {
      const cities = ref<string[]>([]);
      return { cities };
    },
    template: `
      <div style="display:grid;gap:14px;width:420px">
        <KySelect v-model="cities" multiple clearable placeholder="请选择多个城市">
          <KyOption label="北京" value="beijing" />
          <KyOption label="上海" value="shanghai" />
          <KyOption label="广州" value="guangzhou" />
        </KySelect>
        <span>当前选择：{{ cities.join("、") || "暂无" }}</span>
      </div>
    `
  })
};
