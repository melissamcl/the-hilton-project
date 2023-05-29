import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';
dotenv.config();

export default {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    // fallback: {
    //   path: false,
    //   os: false,
    //   fs: false,
    // },
  },

  entry: path.resolve(__dirname, './client/index.tsx'),

  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'source-map-loader'],
      },
      {
        test: /.(scss|sass|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
      },
    }),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, './client'),
    },
    compress: true,
    hot: true,
    port: 8080,
    proxy: {
      '/client': 'http://localhost:3000',
      '/events': 'http://localhost:3000',
      '/key': 'http://localhost:3000',
    },
  },
};
