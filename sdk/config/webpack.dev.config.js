const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    open: true,
    port: 4000,
    compress: true,
    useLocalIp: true,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
