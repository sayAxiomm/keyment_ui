import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import vue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/storybook-static/**",
      "**/coverage/**",
      "**/.vitepress/cache/**",
      "**/.vitepress/.temp/**",
      "apps/docs/examples/legacy/**",
      "packages/icons/src/vue/**"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs["flat/essential"],
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "error"
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"]
      }
    },
    rules: {
      "no-undef": "off"
    }
  },
  {
    files: ["apps/docs/examples/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off"
    }
  },
  eslintConfigPrettier
];
