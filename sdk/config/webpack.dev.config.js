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
    host: process.env.HOST || '0.0.0.0',  //解决Mac中无法通过本机IP访问的问题
    useLocalIp: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
