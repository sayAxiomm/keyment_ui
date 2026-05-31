// Container 布局组件组的统一出口。
// 外部不需要关心每个 vue 文件具体在哪里，只从这个 index.ts 引入即可。

import KyContainer from "./container.vue";
import KyHeader from "./header.vue";
import KyAside from "./aside.vue";
import KyMain from "./main.vue";
import KyFooter from "./footer.vue";
// 导出 KyXxx 命名，和组件 name 保持一致。
export { KyContainer, KyHeader, KyAside, KyMain, KyFooter };
// 再导出一组不带 Ky 前缀的别名。
// 这样用户也可以按更短的名字引入。
export const Container = KyContainer;
export const Header = KyHeader;
export const Aside = KyAside;
export const Main = KyMain;
export const Footer = KyFooter;
// 默认导出主组件。
// import Container from "./Container" 时拿到的是 KyContainer。
export default KyContainer;