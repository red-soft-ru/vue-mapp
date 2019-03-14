const path = require('path');
const merge = require('deepmerge');

function resolve(target) {
  return path.join(__dirname, target);
}

module.exports = {
  pages: {
    index: {
      entry: 'docs/main.ts',
      template: 'docs/public/index.html',
      filename: 'index.html',
    },
  },
  configureWebpack: {
    name: 'Vue Mapp Demo',
    module: {
      rules: [
        {
          resourceQuery: /blockType=example/,
          loader: require.resolve('./build/example-loader.js'),
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.vue', 'index.ts'],
      alias: {
        '@vmsrc': resolve('src'),
        'vue-mapp': resolve('src'),
        '#': resolve('docs'),
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('tailwindcss')(`./docs/tailwind.js`),
          require('autoprefixer')({
            grid: true,
          }),
        ],
      },
      sass: {
        includePaths: ['./src/css'],
      },
    },
  },
};
