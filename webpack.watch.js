const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge.smart(common, {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(scss|less|css)$/,

                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',

                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',

                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',

                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'eval-source-map',
    mode: 'development',
    output: {
        filename: './js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
});
