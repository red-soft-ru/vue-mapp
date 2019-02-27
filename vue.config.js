const path = require('path');

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
    resolve: {
      extensions: ['.ts', '.vue', 'index.ts'],
      alias: {
        '@vmsrc': resolve('src'),
        'vue-mapp': resolve('src'),
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('autoprefixer')({
            grid: true,
          }),
        ],
      },
      sass: {
        includePaths: ['./src'],
      },
    },
  },
};
