import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Keyment UI","text":"Vue 3 组件库","tagline":"基于 Vue 3、TypeScript 和 Vite 构建","actions":[{"theme":"brand","text":"快速开始","link":"/guide/installation"},{"theme":"alt","text":"查看组件","link":"/components/button"}]},"features":[{"title":"Vue 3","details":"使用 Composition API 构建可复用组件"},{"title":"TypeScript","details":"为组件 Props、事件和插槽提供类型支持"},{"title":"Monorepo","details":"使用 pnpm Workspace 管理组件、图标和文档子包"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":null}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
