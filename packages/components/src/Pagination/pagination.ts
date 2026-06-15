type PaginationLayout = "prev" | "pager" | "next";


export interface PaginationProps {
  total?: number; // 总条目数
  pageSize?: number; // 每页显示条目数
  currentPage?: number; // 当前页码
  layout?: string; // 组件布局，例如 "prev, pager, next"
  disabled?: boolean; // 是否禁用分页
}

export interface PaginationEmits {
  (event: "update:currentPage", value: number): void; // v-model:currentPage 更新当前页
  (event: "change", value: number): void; // 当前页变化时触发
}