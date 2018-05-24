const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge.smart(common, {
	devServer: {
		contentBase: './dist',
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env', 'react']
				}
			},
			{
				test: /\.(less|css)$/,

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
					}
				]
			}
		]
	},

	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		// new BundleAnalyzerPlugin()
	],
	devtool: 'eval-source-map',
	mode: 'development',
	output: {
		filename: './js/[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
});