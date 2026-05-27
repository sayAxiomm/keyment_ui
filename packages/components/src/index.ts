import type { App } from "vue";
import { KyButton, KyButtonGroup } from "./Button";
import { KyIcon } from "./icon";
import {
  KyContainer,
  KyHeader,
  KyAside,
  KyMain,
  KyFooter
} from "./Container";

const components = [  
  KyButton,
  KyButtonGroup,
  KyIcon,
  KyContainer,
  KyHeader,
  KyAside,
  KyMain,
  KyFooter
];

export {
  KyButton,
  KyButtonGroup,
  KyIcon,
  KyContainer,
  KyHeader,
  KyAside,
  KyMain,
  KyFooter
};
export const Button = KyButton;
export const ButtonGroup = KyButtonGroup;
export const Icon = KyIcon;

export const Container = KyContainer;
export const Header = KyHeader;
export const Aside = KyAside;
export const Main = KyMain;
export const Footer = KyFooter;

// export default表示这个文件默认导出一个对象。
//Vue 规定：如果一个对象有 install 方法，那么它就可以被：
export default {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name!, component);
    });
  }
};
