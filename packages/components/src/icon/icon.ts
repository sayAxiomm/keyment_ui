// Icon 组件的尺寸可以传数字，也可以传字符串。
// 数字：20 -> 20px
// 字符串："1em" / "20px" / "2rem" -> 原样使用
export type IconSize = number | string;
// Icon 组件对外暴露的 props。
export interface IconProps {
  // 图标大小，例如 <ky-icon :size="20" />
  size?: IconSize;

  // 图标颜色，例如 <ky-icon color="#409eff" />
  color?: string;
}