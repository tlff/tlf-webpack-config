const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge.smart(common, {
	devServer: {
		contentBase: path.join(__dirname, "src", "view"),
		hot: true,
		watchContentBase: true,
		openPage: "./index.html",
		compress: true,
		host: 'localhost',
		port: 8080,
		// proxy: {
		// 	'/api': {
		// 		target: 'http://www.baidu.com/',
		// 		changeOrigin: true,
		// 		secure: false,
		// 		pathRewrite: { "^/api": "" }
		// 	}
		// }
	},
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
		new HtmlWebpackPlugin({
			filename: "./index.html",
			template: './src/view/index.html',
			hash: false,
			inject: true,
			chunksSortMode: 'auto',
		}),
		// new BundleAnalyzerPlugin()
	],
	devtool: 'eval-source-map',
	mode: 'development',
	output: {
		filename: './js/[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
});
