const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: './test/test.js',
  },
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    open: true,
    port: 4000,
    compress: true,
    useLocalIp: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
