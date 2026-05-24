import type { App } from "vue";
import { KyButton } from "./Button";

const components = [KyButton];

export { KyButton };
export const Button = KyButton;

export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name ?? "KyButton", component);
    });
  }
};
