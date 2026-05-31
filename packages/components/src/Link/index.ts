// Link 组件自己的出口文件。
// 外部可以通过 import { KyLink } from "./Link" 引入，而不用写 "./Link/link.vue"。

import KyLink from "./link.vue";

export { KyLink };

// 不带 Ky 前缀的别名，可写可不写。
// 这里保留，方便和其他组件保持一致。
export const Link = KyLink;

export default KyLink;