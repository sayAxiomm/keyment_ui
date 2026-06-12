export type CarouselArrow = "always" | "hover" | "never";
export type CarouselIndicatorPosition = "inside" | "outside" | "none";

export interface CarouselProps {
  height?: string; // 轮播图高度
  initialIndex?: number; // 初始显示第几张，从 0 开始
  autoplay?: boolean; // 是否自动播放
  interval?: number; // 自动播放间隔，单位毫秒
  loop?: boolean; // 是否循环播放
  arrow?: CarouselArrow; // 箭头显示方式
  indicatorPosition?: CarouselIndicatorPosition; // 指示器位置
}

export interface CarouselEmits {
  (event: "change", current: number, prev: number): void; // 当前页变化时触发
}

export interface CarouselContext {
  activeIndex: number; // 当前显示的索引
  previousIndex: number; // 上一次显示的索引
  itemCount: number; // 当前一共有多少个 carousel-item
  addItem: () => number; // carousel-item 注册自己，并拿到自己的索引
  removeItem: () => void; // carousel-item 卸载时减少数量
}
