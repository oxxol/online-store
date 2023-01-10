const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './assets/img/favicon.ico',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './assets/img/webp', to: './assets/image' },
        { from: './assets/img/svg', to: './assets/image' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/image/[name][ext]',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}