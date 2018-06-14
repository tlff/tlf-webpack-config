const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge.smart(common, {
	devServer: {
		contentBase: './dist',
		hot: true,
		watchContentBase: true,
		openPage: "./view/index.html"
		// proxy: {
		// 	'*': {
		// 		target: 'http://localhost:80/ppt/web',
		// 		changeOrigin: true,
		// 		secure: false,
		// 		pathRewrite: { "^/view": "" }
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
