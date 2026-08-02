import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { KyCarousel, KyCarouselItem } from "@keyment/components";

const meta: Meta<typeof KyCarousel> = {
  title: "数据展示/Carousel",
  component: KyCarousel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    height: "240px",
    autoplay: false,
    loop: true,
    arrow: "hover",
    indicatorPosition: "outside"
  },
  argTypes: {
    arrow: { control: "select", options: ["always", "hover", "never"] },
    indicatorPosition: { control: "select", options: ["inside", "outside", "none"] }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => ({
    components: { KyCarousel, KyCarouselItem },
    setup() {
      return { args };
    },
    template: `
      <KyCarousel v-bind="args">
        <KyCarouselItem><div class="slide slide-one">1</div></KyCarouselItem>
        <KyCarouselItem><div class="slide slide-two">2</div></KyCarouselItem>
        <KyCarouselItem><div class="slide slide-three">3</div></KyCarouselItem>
      </KyCarousel>
    `,
    styles: [`
      .slide { display:grid; height:100%; place-items:center; color:#fff; font-size:40px; font-weight:700; }
      .slide-one { background:#409eff; }
      .slide-two { background:#67c23a; }
      .slide-three { background:#e6a23c; }
    `]
  })
};

export const Autoplay: Story = {
  args: {
    autoplay: true,
    interval: 2000,
    arrow: "always",
    indicatorPosition: "inside"
  },
  render: Basic.render!
};
