import { resolve } from "path";
import type { AliasOptions } from "vite";
import { defineConfig } from "vite";

const r = (p: string) => resolve(__dirname, p);

export const alias: AliasOptions = {
  ferz: r("./packages/ferz/src/"),
  "@ferz/locales": r("./packages/locales/src/"),
};

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  resolve: {
    alias,
  },
  test: {
    isolate: false,
    setupFiles: ["./tests/setup.ts"],
  },
});
