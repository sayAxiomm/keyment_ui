import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named"
      }
    }
  }
});
