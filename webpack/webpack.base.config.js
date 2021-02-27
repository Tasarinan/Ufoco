const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
  devtool: 'source-map',
  plugins: [],
};
