import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";
import { resolve as pathResolve } from "node:path";
const resolve = (path: string) => pathResolve(__dirname, path);

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/**/*.test.{ts,tsx}"],
    exclude: ["/.next"],
    setupFiles: "./vitest.setup.ts",
  },
  resolve: {
    alias: {
      "@": resolve("/src"),
      "@api": resolve("src/api"),
      "@shared": resolve("src/shared"),
      "@workbook": resolve("src/workbook"),
      "@quiz": resolve("/src/quiz"),
      "@article": resolve("src/article"),
      "@main": resolve("src/main"),
    },
  },
});
