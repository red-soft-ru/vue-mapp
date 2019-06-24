const path = require('path')

const resolve = v => path.join(__dirname, v)

module.exports = {
  configureWebpack: {
    name: 'Vue Mapp Demo',
    module: {
      rules: [
        {
          resourceQuery: /blockType=examples/,
          loader: require.resolve('./build/examples-loader.js'),
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.vue'],
      symlinks: true,
      alias: {
        '~': resolve('src'),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~vue-mapp/css/functions.scss";`,
      },
      postcss: {
        plugins: [
          require('autoprefixer')({
            grid: true,
          }),
        ],
      },
    },
  },
}
