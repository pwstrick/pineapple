const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base.config.js');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    port: 5000,
    compress: true,
    host: process.env.HOST || '0.0.0.0',  //解决Mac中无法通过本机IP访问的问题
    useLocalIp: true,
    hot: true,
    // historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
