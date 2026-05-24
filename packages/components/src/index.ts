import type { App } from "vue";
import { Button } from "./Button";

const components = [Button];

export { Button };

export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name ?? "Button", component);
    });
  }
};
