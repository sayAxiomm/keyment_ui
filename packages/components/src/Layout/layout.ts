export type RowJustify =
  "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
export type RowAlign = "top" | "middle" | "bottom";

// Row 组件的 props。
export interface RowProps {
  // 栅格间隔，单位是 px。
  // 例如 gutter=20，表示 Col 之间有 20px 间距。
  gutter?: number;
  justify?: RowJustify; // 水平排列方式。
  align?: RowAlign; // 垂直对齐方式。
  tag?: string; // 自定义渲染标签，例如 div / section / main。
}

// Col 组件的 props。
export interface ColProps {
  span?: number; // span 表示占据 24 栅格中的几份,例如 span=12，就是占一半宽度。

  // offset 表示左侧偏移几份。
  // 例如 offset=6，就是左边空出 6/24。
  offset?: number;
  push?: number; // 向右移动几份。
  pull?: number; // 向左移动几份。
  tag?: string;
}
