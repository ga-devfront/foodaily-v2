const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
  pluginOptions: {
    'resolve-alias': {
      alias: {
        src: '/var/www/foodaily-v2/src',
        common: '/var/www/foodaily-v2/src/common',
        components: '/var/www/foodaily-v2/src/components',
      },
    },
  },
  configureWebpack: {
    plugins: [
      new ErrorOverlayPlugin(),
    ],
    devtool: 'cheap-module-source-map',
  },
  devServer: {
    overlay: false,
  },
};
