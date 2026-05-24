import type { App } from "vue";
import { KyButton, KyButtonGroup } from "./Button";

const components = [KyButton, KyButtonGroup];

export { KyButton, KyButtonGroup };
export const Button = KyButton;
export const ButtonGroup = KyButtonGroup;

// export default表示这个文件默认导出一个对象。
//Vue 规定：如果一个对象有 install 方法，那么它就可以被：
export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name!, component);
    });
  }
};
