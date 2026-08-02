import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyDatePicker } from "@keyment/components";
import { ref } from "vue";

const meta: Meta<typeof KyDatePicker> = {
  title: "表单组件/DatePicker",
  component: KyDatePicker,
  tags: ["autodocs"],
  args: {
    placeholder: "请选择日期",
    type: "date",
    size: "default",
    clearable: true,
    disabled: false,
    readonly: false,
    editable: true
  },
  argTypes: {
    type: {
      control: "select",
      options: ["date", "month", "year", "daterange", "monthrange", "yearrange"]
    },
    size: { control: "select", options: ["large", "default", "small"] }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleDate: Story = {
  render: (args) => ({
    components: { KyDatePicker },
    setup() {
      const value = ref("");
      return { args, value };
    },
    template: `
      <div style="display:grid;gap:14px;width:360px">
        <KyDatePicker v-model="value" v-bind="args" />
        <span>当前日期：{{ value || "暂无" }}</span>
      </div>
    `
  })
};

export const DateRange: Story = {
  render: () => ({
    components: { KyDatePicker },
    setup() {
      const range = ref<[string, string]>(["", ""]);
      return { range };
    },
    template: `
      <KyDatePicker
        v-model="range"
        type="daterange"
        clearable
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        range-separator="至"
      />
    `
  })
};

export const DisabledDates: Story = {
  render: () => ({
    components: { KyDatePicker },
    setup() {
      const value = ref("");
      const disabledDate = (date: Date) => date.getTime() < Date.now() - 86400000;
      return { value, disabledDate };
    },
    template: `<KyDatePicker v-model="value" :disabled-date="disabledDate" placeholder="只能选择今天及以后" />`
  })
};
