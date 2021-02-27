const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  target: 'electron-main',
  entry: {
    main: './src/main.dev.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, '../src')],
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
});
