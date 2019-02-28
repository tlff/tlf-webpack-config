const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const PATH = require("path");
//config
//build的时候是否显示报告
const REPORT = true;
//通用chunk


function resolve(dir) {
    return PATH.join(__dirname, dir);
}
module.exports = function (env) {
    env=env?env:"development";

    //插件
    const PLUGINS = (function () {
        var plugins = [];
        plugins.push(new VueLoaderPlugin());
        plugins.push(new MiniCssExtractPlugin({ filename: "css/[name].css" }));
        plugins.push(new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(env)
        }));
        plugins.push(new webpack.ProvidePlugin({
            "_": "lodash",
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        }));

        //从view目录读取文件并注入和文件名字对应的js
        // plugins.push(
        //     new HtmlWebpackPlugin({
        //         filename: 'view/index.html',
        //         template: './src/view/index.html',
        //         chunks: ['app', 'test']
        //     }),
        //     new HtmlWebpackPlugin({
        //         filename: 'view/test.html',
        //         template: './src/view/index.html',
        //         chunks: ['test']
        //     })
        // )
        //build的时候用到的插件
        env == "production" && REPORT ? plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        })) : "";
        return env == "production" ? plugins.concat([]) : plugins;
    })();
    //代码显示模式
    const DEVTOOL = (() => { return env == "production" ? "" : "inline-source-map"; })();
    //环境
    const MODE = (() => { return env; })();

    let ret = {
        externals: {

        },
        resolve: {
            extensions: [".js", ".vue", ".json"],
            alias: {
                "vue$": "vue/dist/vue.common.js",
                "@": resolve("src"),
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",

                    options: {
                        "presets": [
                            "env"
                        ],
                        "plugins": [
                            [
                                "transform-runtime",
                                {
                                    "helpers": false,
                                    "polyfill": false,
                                    "regenerator": true,
                                    "moduleName": "babel-runtime"
                                }
                            ],
                            [
                                "import",
                                {
                                    "libraryName": "iview",
                                    "libraryDirectory": "src/components"
                                }
                            ],
                            "lodash"
                        ]
                    }
                },
                {
                    test: /\.js$/, 
                    loader: "istanbul-instrumenter-loader",
                    exclude: /node_modules|test/,
                    include:/src/,
                    options: {
                        esModules: true
                    },
                },
                {
                    test: /\.vue$/,
                    // exclude: /node_modules/,
                    loader: "vue-loader",
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [{
                        loader: "url-loader",
                        options: {
                            limit: 1000,
                            name: "images/[name].[ext]",
                            // outputPath: "images/",
                            // publicPath: "themes/default/view/images"
                        }
                    }]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: "url-loader",
                    options: {
                        name: "font/[name].[ext]",
                        // outputPath: "/"
                    }
                },
                {
                    test: /\.(scss|less|css)$/,

                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: "css-loader",

                            options: {
                                sourceMap: true,
                            }
                        },
                        {
                            loader: "less-loader",

                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: PLUGINS,
        devtool: DEVTOOL,
        mode: MODE,
        // stats: {
        //     colors: true,
        //     chunks: false,
        //     chunkOrigins: false,
        //     chunkModules: false,
        //     children: false,
        //     cachedAssets: false,
        //     assets: false,
        //     entrypoints: false
        // },
        stats: "minimal"
    };
    return ret;
};