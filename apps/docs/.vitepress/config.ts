import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "Keyment UI",
  description: "基于 Vue 3、TypeScript 和 Vite 构建的组件库",
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/installation" },
      { text: "组件", link: "/components/button" }
    ],

    sidebar: {
      "/guide/": [
        {
          text: "开发指南",
          items: [
            { text: "安装", link: "/guide/installation" },
            { text: "快速开始", link: "/guide/quickstart" }
          ]
        }
      ],
      "/components/": [
        {
          text: "基础组件",
          items: [
            { text: "Button 按钮", link: "/components/button" }
          ]
        },
        {
          text: "表单组件",
          items: [
            { text: "Input 输入框", link: "/components/input" },
            { text: "Switch 开关", link: "/components/switch" }
          ]
        }
      ]
    },

    outline: {
      level: [2, 3],
      label: "页面导航"
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇"
    },
    lastUpdated: {
      text: "最后更新"
    },
    search: {
      provider: "local"
    }
  },

  vite: {
    resolve: {
      alias: {
        "@keyment/components": fileURLToPath(
          new URL(
            "../../../packages/components/src/index.ts",
            import.meta.url
          )
        ),
        "@keyment/icons": fileURLToPath(
          new URL(
            "../../../packages/icons/src/index.ts",
            import.meta.url
          )
        )
      }
    }
  }
});
