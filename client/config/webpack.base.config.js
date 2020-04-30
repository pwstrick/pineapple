const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: {
    index: './src/index.js',
    // index2: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
          // 'happypack/loader?id=babel',
          { loader: 'eslint-loader', options: { fix: true } },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            limit: 8192,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'font/',
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
          { loader: 'eslint-loader', options: { fix: true } },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    // new HappyPack({
    //   id: 'babel',
    //   loaders: [
    //     {
    //         loader: 'babel-loader',
    //         options: {
    //             cacheDirectory: true
    //         }
    //     }
    //   ],
    //   threadPool: happyThreadPool
    // })
  ],
};
