const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports =merge.smart(common, {
	module: {
		rules: [
			{
				test: /\.(less|css)$/,

				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',

						options: {
							sourceMap: true,
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
		new UglifyJSPlugin(),
		new MiniCssExtractPlugin({ filename: 'css/[name].[chunkhash].css' }),
		new webpack.optimize.SplitChunksPlugin({
			chunks:"initial",
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					enforce: true
				},
			}
		}),
		new webpack.optimize.RuntimeChunkPlugin({
			name:'manifest'
		}),
		// new BundleAnalyzerPlugin()
	],

	
	mode: 'production'
});
