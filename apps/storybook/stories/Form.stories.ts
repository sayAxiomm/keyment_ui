import type { Meta, StoryObj } from "@storybook/vue3-vite";
import {
  KyButton,
  KyForm,
  KyFormItem,
  KyInput,
  KySwitch
} from "@keyment/components";
import { reactive } from "vue";

const meta: Meta<typeof KyForm> = {
  title: "表单组件/Form",
  component: KyForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { KyButton, KyForm, KyFormItem, KyInput, KySwitch },
    setup() {
      const form = reactive({
        username: "",
        description: "",
        enabled: true
      });
      return { form };
    },
    template: `
      <KyForm :model="form" label-width="90px" style="max-width:520px">
        <KyFormItem label="用户名" prop="username" required>
          <KyInput v-model="form.username" placeholder="请输入用户名" />
        </KyFormItem>
        <KyFormItem label="个人介绍" prop="description">
          <KyInput v-model="form.description" type="textarea" :rows="3" placeholder="请输入个人介绍" />
        </KyFormItem>
        <KyFormItem label="启用账号" prop="enabled">
          <KySwitch v-model="form.enabled" />
        </KyFormItem>
        <KyFormItem>
          <KyButton type="primary">保存</KyButton>
        </KyFormItem>
      </KyForm>
    `
  })
};

export const Validation: Story = {
  render: () => ({
    components: { KyButton, KyForm, KyFormItem, KyInput },
    setup() {
      const form = reactive({ username: "", email: "" });
      const rules = {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 12, message: "长度应为 2 到 12 个字符", trigger: "blur" }
        ],
        email: {
          pattern: /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/,
          message: "请输入正确的邮箱地址",
          trigger: "blur"
        }
      };
      return { form, rules };
    },
    template: `
      <KyForm :model="form" :rules="rules" label-width="90px" style="max-width:520px">
        <KyFormItem label="用户名" prop="username" required>
          <KyInput v-model="form.username" placeholder="失焦时校验" />
        </KyFormItem>
        <KyFormItem label="邮箱" prop="email">
          <KyInput v-model="form.email" placeholder="name@example.com" />
        </KyFormItem>
        <KyFormItem><KyButton type="primary">提交</KyButton></KyFormItem>
      </KyForm>
    `
  })
};

export const TopLabels: Story = {
  render: () => ({
    components: { KyForm, KyFormItem, KyInput },
    setup() {
      const form = reactive({ title: "", content: "" });
      return { form };
    },
    template: `
      <KyForm :model="form" label-position="top" style="max-width:520px">
        <KyFormItem label="标题"><KyInput v-model="form.title" /></KyFormItem>
        <KyFormItem label="内容"><KyInput v-model="form.content" type="textarea" :rows="4" /></KyFormItem>
      </KyForm>
    `
  })
};
