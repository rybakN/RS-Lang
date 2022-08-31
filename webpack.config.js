const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
    entry:{
      'index': path.resolve(__dirname, './src/main.ts'),
      'pages/sprint': path.resolve(__dirname, './src/pages/games/sprint.ts'),
      'pages/textbook': path.resolve(__dirname, './src/pages/textbook/textbook.ts')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
              test: /\.ts$/,
              loader: 'ts-loader',
            },
            {
              test: /\.(png|jpe?g|gif|svg)$/i,
              loader: 'file-loader',
              options: {
                name: 'pictures/[name].[ext]',
              },
            },
            {
              test: /\.mp3$/,
              loader: 'file-loader',
              options: {
                name: 'audio/[name].[ext]',
              },
            },
            {
              test: /\.ico$/i,
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            chunks:['index'],
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/pages/textbook/textbook.html'),
          filename: 'pages/textbook.html',
          chunks:['pages/textbook']
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/pages/games/sprint.html'),
          filename: 'pages/sprint.html',
          chunks: ["pages/sprint"],
      }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: "[id].css",
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
