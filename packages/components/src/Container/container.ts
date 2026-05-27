
export interface ContainerProps {
  // direction 是可选的，所以后面有 ?。
  // 如果用户不传，我们后面会在 container.vue 里给默认值。
  direction?: "horizontal" | "vertical";
}
export interface HeaderProps {
  // 高度用 string，是为了允许 "60px"、"4rem"、"10vh" 这种 CSS 单位。
  height?: string;
}
export interface AsideProps {
  // 宽度也用 string，因为 CSS 宽度不一定只有 px。
  width?: string;
}
export interface FooterProps {
  // 例如 height="50px"。
  height?: string;
}