const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
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
				test: /\.css$/,

				use: [
					{
						loader: "style-loader"
					},
					// {
					// 	loader: MiniCssExtractPlugin.loader
					// },
					{
						loader: 'css-loader',
						// options: {
						// 	sourceMap: true
						// }
					}
				]
			}
		]
	},

	plugins: [
		new UglifyJSPlugin(),
		// new MiniCssExtractPlugin({ filename: 'style.css' }),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: './src/index.html',
			hash: false,
			inject: true,
			chunksSortMode: 'auto',
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		// new BundleAnalyzerPlugin()
		new CleanWebpackPlugin('./dist')
	],
	entry: {
		index: './src/index.js',
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	// devtool: 'inline-source-map',
	// mode: 'production'
	mode: 'development'
};
