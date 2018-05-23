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
                        name: './images/[name].[hash].[ext]',
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: "./font/[name].[hash].[ext]"
                }
            },
            {
                test: /\.(less|css)$/,

                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        },

                    },
                    {
                        loader: 'less-loader',

                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/index.html',
            hash: false,
            inject: true,
            chunksSortMode: 'auto',
        }),
        new CleanWebpackPlugin('./dist'),
    ],
    entry: {
        index: './src/index.js',
    },

    output: {
        filename: './js/[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
};