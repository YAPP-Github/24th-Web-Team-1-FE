import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";
import { resolve as pathResolve } from "node:path";
import svgr from "vite-plugin-svgr";
const resolve = (path: string) => pathResolve(__dirname, path);

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/**/*.test.{ts,tsx}"],
    exclude: ["/.next"],
    setupFiles: "./vitest.setup.ts",
    deps: {
      inline: ["vitest-canvas-mock"],
    },
  },
  resolve: {
    alias: {
      "@": resolve("src"),
      "@api": resolve("src/api"),
      "@shared": resolve("src/shared"),
      "@workbook": resolve("src/workbook"),
      "@article": resolve("src/article"),
      "@main": resolve("src/main"),
      "@mocks": resolve("src/mocks"),
      "@common": resolve("src/common"),
      "@problem": resolve("src/problem"),
      "@subscription": resolve("src/subscription"),
      "@auth": resolve("src/auth"),
      public: resolve("public"),
    },
  },
});
