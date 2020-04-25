const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OpitimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin');
module.exports = {
    entry:{
        app: './src/client/app.js',
    },
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin(), new OpitimizeCSSAssetsPlugin()]
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
              },
              {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader",
                  },
                ],
              },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            chunks: ['app']
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new GenerateSW(),
        new CleanWebpackPlugin()
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    }
}
