import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  // 让 Vite 能解析 .vue 单文件组件
  plugins: [vue()],
   resolve: {
    alias: {
      // 开发 docs 时直接读取组件源码，不走 dist 构建产物
      "@keyment/components": fileURLToPath(
        new URL("../../packages/components/src/index.ts", import.meta.url)
      ),
      "@keyment/icons": fileURLToPath(
        new URL("../../packages/icons/src/index.ts", import.meta.url)
      )
    }
  }
});
