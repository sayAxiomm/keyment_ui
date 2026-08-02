import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyPagination } from "@keyment/components";
import { ref } from "vue";

const meta: Meta<typeof KyPagination> = {
  title: "数据展示/Pagination",
  component: KyPagination,
  tags: ["autodocs"],
  args: {
    total: 100,
    pageSize: 10,
    currentPage: 1,
    layout: "prev, pager, next",
    size: "default",
    background: false,
    disabled: false,
    pagerCount: 7
  },
  argTypes: {
    size: { control: "select", options: ["large", "default", "small"] }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => ({
    components: { KyPagination },
    setup() {
      const currentPage = ref(args.currentPage ?? 1);
      return { args, currentPage };
    },
    template: `
      <div style="display:grid;gap:16px">
        <KyPagination v-model:current-page="currentPage" v-bind="args" />
        <span>当前页：{{ currentPage }}</span>
      </div>
    `
  })
};

export const Background: Story = {
  args: {
    background: true
  }
};

export const Small: Story = {
  args: {
    background: true,
    size: "small"
  }
};
