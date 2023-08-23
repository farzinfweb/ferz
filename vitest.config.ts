import { resolve } from "path";
import type { AliasOptions } from "vite";
import { defineConfig } from "vite";

const r = (p: string) => resolve(__dirname, p);

export const alias: AliasOptions = {
  ferz: r("./packages/ferz/src/"),
  "@ferz/gregorian-calendar": r("./packages/calendars-gregorian/src/"),
  "@ferz/perian-calendar": r("./packages/calendars-persian/src/"),
  "@ferz/islamic-calendar": r("./packages/calendars-islamic/src/"),
  "@ferz/datepicker": r("./packages/datepicker/src/"),
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
