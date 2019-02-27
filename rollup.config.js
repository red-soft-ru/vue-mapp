import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import json from 'rollup-plugin-json';
import VuePlugin from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import uglify from 'rollup-plugin-uglify-es';
import analyze from 'rollup-plugin-analyzer';

export default {
  input: `src/pack/all.ts`,
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      sourcemap: false,
      name: 'dsd',
      globals: ['tslib_1'],
    },
  ],
  external: ['vue-property-decorator', 'tslib', 'vue-template-compiler'],
  plugins: [
    css(),
    VuePlugin({
      css: false,
      styleInjector: false,
      style: {
        postcssPlugins: [require('autoprefixer')(), require('cssnano')()],
        preprocessOptions: {
          scss: {
            includePaths: ['./src'],
          },
        },
      },
    }),

    json(),
    typescript(),
    commonjs(),
    resolve(),
    uglify(),
    analyze(),
    (function() {
      return {
        name: 'replace',
        transformBundle(code) {
          return {
            code: `require('./index.css');${code}`,
          };
        },
      };
    })(),
  ],
};
