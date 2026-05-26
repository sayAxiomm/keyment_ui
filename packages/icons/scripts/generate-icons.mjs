// 读取 svg 文件夹里的所有 .svg
// 把每个 svg 文件名转换成组件名
// 读取 svg 文件内容
// 把 svg 内容包进 Vue 单文件组件模板
// 写入 src/vue 目录
// 最后生成 index.ts 统一导出



// Node 内置的文件系统 API，用来读目录、读文件、写文件、创建目录
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";

// Node 内置的路径 API，用来拼接路径、获取文件扩展名、解析绝对路径
import { dirname, extname, join, resolve } from "node:path";

// Node 内置 API：把 import.meta.url 转成真实文件路径
import { fileURLToPath } from "node:url";

/**
 * 当前脚本所在目录。
 *
 * import.meta.url 拿到的是 file URL，例如：
 * file:///E:/SeaA_WEB/keyment_ui/packages/icons/scripts/generate-icons.mjs
 *
 * fileURLToPath 会把它转成 Windows 路径：
 * E:\SeaA_WEB\keyment_ui\packages\icons\scripts\generate-icons.mjs
 *
 * dirname 再取它的目录：
 * E:\SeaA_WEB\keyment_ui\packages\icons\scripts
 */
const currentDir = dirname(fileURLToPath(import.meta.url));

/**
 * icons 包根目录。
 *
 * 当前脚本在：
 * packages/icons/scripts
 *
 * 所以往上一级就是：
 * packages/icons
 */
const packageRoot = resolve(currentDir, "..");

/**
 * 原始 SVG 文件目录。
 *
 * 你的 SVG 都放在：
 * packages/icons/src/svg
 */
const svgDir = resolve(packageRoot, "src/svg");

/**
 * Vue 图标组件生成目录。
 *
 * Vue 图标组件会生成到：
 * packages/icons/src/vue
 *
 * 例如：
 * packages/icons/src/vue/Plus.vue
 * packages/icons/src/vue/Search.vue
 */
const vueOutputDir = resolve(packageRoot, "src/vue");

/**
 * icons 包入口文件。
 *
 * 这个文件仍然放在 packages/icons/src/index.ts，
 * 负责统一导出 src/vue 里面生成的所有图标组件。
 */
const indexFile = resolve(packageRoot, "src/index.ts");

/**
 * 把 svg 文件名转换成 Vue 组件名。
 *
 * plus.svg        -> Plus
 * arrow-down.svg  -> ArrowDown
 * circle-close.svg -> CircleClose
 */
function toPascalCase(fileName) {
  return fileName
    // 去掉 .svg 后缀
    .replace(/\.svg$/i, "")

    // 按 - 分割，比如 arrow-down -> ["arrow", "down"]
    .split("-")

    // 过滤空字符串，避免异常文件名导致问题
    .filter(Boolean)

    // 每一段首字母大写
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))

    // 拼成 PascalCase
    .join("");
}

/**
 * 清理 SVG 内容。
 *
 * 目的：
 * 1. 去掉 xml / doctype 声明，Vue template 里不需要
 * 2. 去掉 width / height，让大小交给 KyIcon 控制
 * 3. 给 svg 加 aria-hidden="true"，默认作为装饰图标，不让读屏器重复朗读
 */
function normalizeSvg(svg) {
  return svg
    // 去掉 XML 声明，例如：<?xml version="1.0" encoding="UTF-8"?>
    .replace(/<\?xml.*?\?>\s*/g, "")

    // 去掉 DOCTYPE 声明
    .replace(/<!DOCTYPE.*?>\s*/g, "")

    // 去掉 svg 上的 width="xxx"
    .replace(/\swidth="[^"]*"/g, "")

    // 去掉 svg 上的 height="xxx"
    .replace(/\sheight="[^"]*"/g, "")

    // 给 <svg ...> 加 aria-hidden="true"
    .replace(/<svg([^>]*)>/, '<svg$1 aria-hidden="true">')

    // 去掉首尾空白
    .trim();
}

/**
 * 把 SVG 字符串包装成 Vue 单文件组件内容。
 *
 * 输入：
 * <svg>...</svg>
 *
 * 输出：
 * <template>
 *   <svg>...</svg>
 * </template>
 */
function createVueContent(svg) {
  return `<template>
  ${svg}
</template>
`;
}

// 读取 svg 目录下的所有文件名
const files = await readdir(svgDir);

// 只保留 .svg 文件
const svgFiles = files.filter((file) => extname(file) === ".svg");

// 确保 Vue 图标组件输出目录存在。
await mkdir(vueOutputDir, { recursive: true });

// 用来收集 index.ts 的导出语句
const exports = [];

// 遍历每一个 svg 文件
for (const file of svgFiles) {
  // 文件名转组件名：
  // arrow-down.svg -> ArrowDown
  const componentName = toPascalCase(file);

  // 当前 svg 文件的完整路径
  const svgPath = join(svgDir, file);

  // 读取 svg 文件内容
  const svg = await readFile(svgPath, "utf-8");

  // 清理 svg 内容
  const normalizedSvg = normalizeSvg(svg);

  // 生成 Vue 单文件组件内容
  const vueContent = createVueContent(normalizedSvg);

  // 生成的 Vue 文件名：
  // ArrowDown.vue
  const vueFile = `${componentName}.vue`;

  // 写入 packages/icons/src/vue/ArrowDown.vue
  await writeFile(join(vueOutputDir, vueFile), vueContent, "utf-8");

  // 收集导出语句：
  // export { default as ArrowDown } from "./vue/ArrowDown.vue";
  exports.push(`export { default as ${componentName} } from "./vue/${componentName}.vue";`);
}

// 生成 packages/icons/src/index.ts
// 里面统一导出所有图标组件
await writeFile(indexFile, `${exports.join("\n")}\n`, "utf-8");

// 输出生成结果，方便你知道生成了多少个图标
console.log(`Generated ${svgFiles.length} icons.`);
