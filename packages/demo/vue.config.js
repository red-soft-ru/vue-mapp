const path = require('path');
const merge = require('deepmerge');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function resolve(target) {
  return path.join(__dirname, target);
}

module.exports = {
  pages: {
    index: {
      entry: './main.ts',
      template: './public/index.html',
      filename: 'index.html',
    },
  },
  configureWebpack: {
    name: 'Vue Mapp Demo',
    module: {
      rules: [
        {
          resourceQuery: /blockType=examples/,
          loader: require.resolve('./build/examples-loader.js')
        },
      ]
    },
    resolve: {
      alias: {
        vue$: resolve('node_modules/vue'),
        'vue-property-decorator': resolve('node_modules/vue-property-decorator'),
      },
      extensions: ['.ts', '.vue', 'index.ts'],
      symlinks: true,
      plugins: [
        new TsconfigPathsPlugin({
          configFile: '../../tsconfig.json'
        })
      ]
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('tailwindcss')(`./tailwind.js`),
          require('autoprefixer')({
            grid: true,
          }),
        ],
      },
      sass: {
        includePaths: [
          './src/css',
          '../vue-mapp/css'
        ],
      },
    },
  },
};
