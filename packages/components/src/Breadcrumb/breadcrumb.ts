export interface BreadcrumbProps {
  separator?: string; // 分隔符
}

export interface BreadcrumbItemProps {
  to?: string; // 跳转地址
  replace?: boolean; // 是否使用 replace 跳转
}

export interface BreadcrumbContext {
  separator: string; // 父组件传给子组件的分隔符
}