import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index",
    {
      builder: "mkdist",
      input: "./src/locales/",
      outDir: "./locales",
    },
  ],
  clean: true,
  declaration: true,
  externals: [],
  rollup: {
    emitCJS: true,
  },
});
