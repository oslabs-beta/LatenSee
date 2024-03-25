const webpack = require('webpack'); 
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', 
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true, 
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    proxy: [{
      context: ['/api/**'],
      target: 'http://localhost:3000/',
    },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      },
      {
        test: /\.s?css$/, 
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
      },

    ]
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },

};