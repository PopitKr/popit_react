const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const cleanWebpackPlugin = require('clean-webpack-plugin');

//https://tylermcginnis.com/react-router-server-rendering/
//https://codeburst.io/react-server-side-rendering-ssr-with-express-and-css-modules-722ef0cc8fa0
const browserConfig = {
  name: 'client',
  entry: ['babel-polyfill', './src/browser/index.js'],
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      use: [{
        loader: 'babel-loader',
        options: {
          plugins: [
            ["import", {"libraryName": "antd", "style": "css"}], // antd import 구문을 심플하게 해주는 plugin, https://github.com/ant-design/babel-plugin-import
          ]
        }
      }],
      exclude: [
        /(node_modules|bower_components|unitTest)/,
      ]
    }, {
      test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
    }, {
      test: /\.(png|svg|jpg|gif|ico)$/,
        loader: 'file-loader'
    }]
  },
  plugins: [
    new cleanWebpackPlugin(['public']),
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true),
    })
  ]
};

const serverConfig = {
  name: 'server',
  entry: ['babel-polyfill', './src/server/index.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname + '/server/',
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: [
        /(node_modules|bower_components|unitTest)/,
      ]
    }, {
      test: /\.css$/,
      loader: 'css-loader/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
    }, {
      test: /\.(png|svg|jpg|gif|ico)$/,
      loader: 'url-loader?limit=10240'
    }]
  },
  plugins: [
    new cleanWebpackPlugin(['server']),
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(false),
    }),
  ]
};

module.exports = [browserConfig, serverConfig];