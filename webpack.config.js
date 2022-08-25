const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
    entry:{
      main: path.resolve(__dirname, './src/main.ts'),
      sprintGame: path.resolve(__dirname, './src/games/sprint-game.ts'),
      sprint: path.resolve(__dirname, './src/pages/games/sprint.ts'),
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
              test: /\.(png|jpe?g|gif)$/i,
              loader: 'file-loader',
              options: {
                name: 'pictures/[name].[ext]',
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
            chunks: ["index"],
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/pages/games/sprint.html'),
          filename: 'sprint.html',
          chunks: ["sprint"],
      }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
