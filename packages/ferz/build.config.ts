import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index", "src/locales"],
  clean: true,
  declaration: true,
  externals: [],
  rollup: {
    emitCJS: true,
  },
});
