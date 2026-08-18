export type TabName = string | number;

export interface TabsProps {
  modelValue?: TabName; // 当前激活的 tab 名称
}

export interface TabsEmits {
  (event: "update:modelValue", value: TabName): void; // v-model 更新当前激活 tab
  (event: "tab-click", value: TabName): void; // 点击 tab 时触发
}

export interface TabPaneProps {
  label?: string; // tab 标题
  name?: TabName; // tab 唯一标识
  disabled?: boolean; // 是否禁用
}

export interface TabPaneContext {
  label: string; // tab 标题
  name: TabName; // tab 唯一标识
  disabled: boolean; // 是否禁用
}

export interface TabsContext {
  activeName: TabName | undefined; // 当前激活的 tab
  addPane: (pane: TabPaneContext) => void; // 注册 tab-pane
  removePane: (name: TabName) => void; // 卸载 tab-pane
}
