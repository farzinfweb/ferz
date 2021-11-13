import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/ferz.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/build/ferz.min.js',
      format: 'iife',
      name: 'ferz',
      sourcemap: true,
      plugins: [ terser({ format: { comments: false, ecma: 2015 } }) ]
    }
  ],
  plugins: [
    typescript(),
    babel({ babelHelpers: 'bundled' }),
  ]
};