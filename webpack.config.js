const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  return {
    context: __dirname,  // 모듈 파일 폴더

    entry: {
      app: './src/index.js',
      vendor: [
        'react', 'react-dom', 'antd'
      ]
    },

    output: {
      path: __dirname + '/dist/',               // 번들 파일 폴더
      filename: 'js/[name].[hash].bundle.js',   // 번들 파일 이름 규칙
      sourceMapFilename: 'js/[name].[chunkhash].bundle.map',  // SourceMap 이름 규칙
      chunkFilename: 'js/[name].[chunkhash].chunk.js',  // Chunk file 이름 규칙
    },

    devServer: {
      inline: true,
      compress: true,
      port: 5000,
      contentBase: __dirname + '/dist/',
      publicPath: '/',
      historyApiFallback: true,
    },

    devtool: 'inline-source-map',

    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ["env", {
                "targets": {
                  "browsers": ["last 2 versions", "safari >= 7"]
                }
              }],
              "stage-2",
              'react'
            ],
            plugins: [
              'react-hot-loader/babel',   // 모듈 변경 시 자동으로 브라우저를 reload 해주는 기능, https://github.com/gaearon/react-hot-loader
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
      new CleanWebpackPlugin(['dist']),
      // new ExtractTextPlugin({
      //   filename: '[name].css'
      // }),
      new HtmlWebpackPlugin({
        template: './index.html',
        chunksSortMode: 'dependency'
      }),
    ],
  };
};