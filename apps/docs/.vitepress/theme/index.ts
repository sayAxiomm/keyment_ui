import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import KeymentUI from "@keyment/components";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(KeymentUI);
  }
} satisfies Theme;
