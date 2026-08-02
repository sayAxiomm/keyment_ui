import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyCol, KyRow } from "@keyment/components";

const meta: Meta<typeof KyRow> = {
  title: "布局组件/Layout",
  component: KyRow,
  tags: ["autodocs"],
  parameters: { layout: "padded" }
};

export default meta;
type Story = StoryObj<typeof meta>;

const cellStyle = "padding:14px 0;color:#fff;text-align:center;background:#409eff;border-radius:4px";
const lightCellStyle = `${cellStyle};background:#79bbff`;

export const Grid: Story = {
  render: () => ({
    components: { KyCol, KyRow },
    setup() {
      return { cellStyle, lightCellStyle };
    },
    template: `
      <div style="display:grid;gap:14px">
        <KyRow :gutter="12">
          <KyCol :span="8"><div :style="cellStyle">8</div></KyCol>
          <KyCol :span="8"><div :style="lightCellStyle">8</div></KyCol>
          <KyCol :span="8"><div :style="cellStyle">8</div></KyCol>
        </KyRow>
        <KyRow :gutter="12">
          <KyCol :span="6"><div :style="cellStyle">6</div></KyCol>
          <KyCol :span="12"><div :style="lightCellStyle">12</div></KyCol>
          <KyCol :span="6"><div :style="cellStyle">6</div></KyCol>
        </KyRow>
      </div>
    `
  })
};

export const Alignment: Story = {
  render: () => ({
    components: { KyCol, KyRow },
    setup() {
      return { cellStyle };
    },
    template: `
      <KyRow justify="space-between" align="middle" style="min-height:100px;background:#f5f7fa">
        <KyCol :span="5"><div :style="cellStyle">左侧</div></KyCol>
        <KyCol :span="5"><div :style="cellStyle">中间</div></KyCol>
        <KyCol :span="5"><div :style="cellStyle">右侧</div></KyCol>
      </KyRow>
    `
  })
};
