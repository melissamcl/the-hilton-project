const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),

  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '',
    filename: 'bundle.js'
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              ['@babel/preset-react', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [new HtmlWebpackPlugin({
    template: './index.html'
  })],

  devServer: {
    static: {
      directory: path.resolve(__dirname, './client'),
    },
    compress: true,
    hot: true,
    // port: 8080,
    // proxy: {
    //   '/': 'http://localhost:3000'
    // }
  },
}