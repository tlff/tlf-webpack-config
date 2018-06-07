const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                options: {
                    presets: ['env', 'react'],
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }, {
                    loader: 'file-loader',
                    options: {
                        name: './images/[hash].[ext]',
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: "./font/[name].[hash].[ext]"
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "./view/index.html",
            template: './src/view/index.html',
            hash: false,
            inject: true,
            chunksSortMode: 'auto',
        }),
        new CleanWebpackPlugin('./dist'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    entry: {
        index: './src/js/index.js',
    },
    
    output: {
        filename: './js/[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
};