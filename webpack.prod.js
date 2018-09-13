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
			"minSize": 0,
			"misChunks": 1,
			"maxAsyncRequests": 1,
			"maxInitialRequests": 1,
			"name": false,
			"automaticNameDelimiter": "~",
			// "filename": false,
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					enforce: true,
					"priority": -20,
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
