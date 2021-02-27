const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { spawn } = require('child_process');
const ESLintPlugin = require('eslint-webpack-plugin');
//const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const host = `0.0.0.0`;
const port = 3100;
const src = path.resolve(__dirname, '../src');

const baseConfig = require('./webpack.renderer.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  cache: true,
  /* entry: {
    renderer: './src/index.js',
    vendors: ['react', 'react-dom', 'react-refresh/runtime'],
  },*/
  entry: ['react-hot-loader/patch', 'webpack/hot/only-dev-server', src],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin(),
    //   new ReactRefreshWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  optimization: {
    moduleIds: 'named',
    runtimeChunk: 'single',
  },
  /*
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        ],
      },
    ],
  },*/
  devServer: {
    host,
    port,
    hot: true,
    contentBase: path.join(__dirname, '../public'),
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    quiet: true,
    overlay: true,
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
    before() {
      console.log('Starting main process');
      spawn('npm', ['run', 'start-main-dev'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', (code) => process.exit(code))
        .on('error', (spawnError) => console.error(spawnError));
    },
  },
});
