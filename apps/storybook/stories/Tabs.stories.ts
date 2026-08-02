import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyTabPane, KyTabs } from "@keyment/components";
import { ref } from "vue";

const meta: Meta<typeof KyTabs> = {
  title: "导航组件/Tabs",
  component: KyTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { KyTabPane, KyTabs },
    setup() {
      const activeTab = ref("user");
      return { activeTab };
    },
    template: `
      <div style="display:grid;gap:16px">
        <KyTabs v-model="activeTab">
          <KyTabPane label="用户管理" name="user">用户管理内容</KyTabPane>
          <KyTabPane label="配置管理" name="config">配置管理内容</KyTabPane>
          <KyTabPane label="角色管理" name="role" disabled>角色管理内容</KyTabPane>
        </KyTabs>
        <span>当前标签：{{ activeTab }}</span>
      </div>
    `
  })
};

export const NumericNames: Story = {
  render: () => ({
    components: { KyTabPane, KyTabs },
    setup() {
      const active = ref(1);
      return { active };
    },
    template: `
      <KyTabs v-model="active">
        <KyTabPane label="第一步" :name="1">填写基本信息</KyTabPane>
        <KyTabPane label="第二步" :name="2">确认提交内容</KyTabPane>
        <KyTabPane label="第三步" :name="3">完成</KyTabPane>
      </KyTabs>
    `
  })
};
