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
            { text: "Button 按钮", link: "/components/button" },
            { text: "Icon 图标", link: "/components/icon" },
            { text: "Link 链接", link: "/components/link" }
          ]
        },
        {
          text: "布局组件",
          items: [
            { text: "Layout 栅格", link: "/components/layout" },
            { text: "Container 布局容器", link: "/components/container" }
          ]
        },
        {
          text: "表单组件",
          items: [
            { text: "Radio 单选框", link: "/components/radio" },
            { text: "Checkbox 多选框", link: "/components/checkbox" },
            { text: "Input 输入框", link: "/components/input" },
            { text: "Switch 开关", link: "/components/switch" },
            { text: "Select 选择器", link: "/components/select" },
            { text: "DatePicker 日期选择器", link: "/components/date-picker" },
            { text: "Upload 上传", link: "/components/upload" },
            { text: "Form 表单", link: "/components/form" }
          ]
        },
        {
          text: "数据展示",
          items: [
            { text: "Carousel 走马灯", link: "/components/carousel" },
            { text: "Pagination 分页", link: "/components/pagination" },
            { text: "Breadcrumb 面包屑", link: "/components/breadcrumb" },
            { text: "Tabs 标签页", link: "/components/tabs" }
          ]
        },
        {
          text: "反馈组件",
          items: [
            { text: "Dialog 对话框", link: "/components/dialog" },
            { text: "Message 消息提示", link: "/components/message" },
            { text: "Backtop 回到顶部", link: "/components/backtop" }
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
