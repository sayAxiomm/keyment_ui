import { setup, type Preview } from "@storybook/vue3-vite";
import KeymentUI from "@keyment/components";

setup((app) => {
  app.use(KeymentUI);
});

const preview: Preview = {
  tags: ["autodocs"],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: "centered"
  }
};

export default preview;
