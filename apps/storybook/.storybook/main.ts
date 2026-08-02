import { fileURLToPath, URL } from "node:url";
import type { StorybookConfig } from "@storybook/vue3-vite";
import vue from "@vitejs/plugin-vue";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(js|ts)"
  ],

  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],

  framework: {
    name: "@storybook/vue3-vite",
    options: {
      docgen: "vue-component-meta"
    }
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          "@keyment/components": fileURLToPath(
            new URL(
              "../../../packages/components/src/index.ts",
              import.meta.url
            )
          ),
          "@keyment/icons": fileURLToPath(
            new URL(
              "../../../packages/icons/src/index.ts",
              import.meta.url
            )
          )
        }
      }
    });
  }
};

export default config;
