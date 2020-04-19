const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    entry:{
        app: './src/client/app.js',
        trips: './src/client/trips.js'
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [{
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            title: 'Development Home',
            chunks: ['app']
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/views/my-trips.html",
            filename: "./trips.html",
            title: 'Development Trips',
            chunks: ['trips']
        }),
        new CleanWebpackPlugin()
    ],
    output: {
       filename: "./dist/[name].js",
       path: __dirname + '/dist'
    },
}