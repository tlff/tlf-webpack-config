const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const fs = require("fs");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const PATH = require("path");
const dist = PATH.resolve(__dirname, "./src/dist/");
const VIEW = PATH.join(__dirname, "./src/view/");
//config
//build的时候是否显示报告
const REPORT = true;
//排除的文件,不会个这几个文件注入js
const EXCLUDE = ["footer", "head", "header", "leftside", "script", "debug"];
//入口
const ENTRY = {
    index: "./src/js/index.js"
};
//通用chunk
const COMMONCHUNKS = [];


module.exports = function (env, argv) {
    function readDirSync(path) {
        let ret = [];
        let pa = fs.readdirSync(path);
        pa.forEach(function (ele) {
            let info = fs.statSync(path + "/" + ele);
            if (info.isDirectory()) {
                ret = ret.concat(readDirSync(PATH.join(path, ele)));
            } else {
                ret = ret.concat(PATH.join(path, ele));
            }
        });
        return ret;
    }
    function getview(path) {
        let ret = [];
        let basepath = PATH.join(path);
        let files = readDirSync(basepath);
        files.forEach(v => {
            let chunk = v.replace(/.*[\\/]/, "").split(".").shift();
            let chunks = [];
            if (EXCLUDE.indexOf(chunk) == -1) {
                chunks = COMMONCHUNKS.concat([chunk]);
            }
            let t = new HtmlWebpackPlugin({
                filename: v.replace(basepath, ""),
                template: v,
                chunks: chunks,
                hash: false,
                inject: true,
                chunksSortMode: "auto",
            });
            ret.push(t);
        });
        return ret;
    }

    const DEVSERVER = argv.ishot ? {
        contentBase: PATH.join(__dirname, "src", "view"),
        // hot: true,
        watchContentBase: true,
        openPage: "./view/index.html",
        publicPath: "http://localhost:8080/",
        compress: false,
        host: "localhost",
        port: 8080,
        proxy: {
            "/api": {
                target: "http://localhost/test",
                changeOrigin: true,
                secure: false,
                pathRewrite: { "^/api": "" }
            }
        }
    } : {};
    //插件
    const PLUGINS = (function () {
        var plugins = [];
        plugins.push(new CleanWebpackPlugin(dist));
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

        if (argv.ishot) {
            plugins.push(new webpack.NamedModulesPlugin());
            plugins.push(new webpack.HotModuleReplacementPlugin());
        }
        //从view目录读取文件并注入和文件名字对应的js
        plugins = plugins.concat(getview(VIEW));
        // plugins.push(
        //     new HtmlWebpackPlugin({
        //         filename: "view/index.html",
        //         template: "./src/view/index.html",
        //         chunks: ["app", "test"]
        //     }),
        //     new HtmlWebpackPlugin({
        //         filename: "view/test.html",
        //         template: "./src/view/index.html",
        //         chunks: ["test"]
        //     })
        // )
        //build的时候用到的插件
        var buildPlugins = [
            new UglifyJSPlugin({
                parallel: true,
                cache: false,
                extractComments: true
            }),
            new webpack.optimize.SplitChunksPlugin({
                chunks: "initial",
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 4,
                automaticNameDelimiter: "~",
                name: true,
                cacheGroups: {
                    default: {
                        minChunks: 3,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    }
                }
            }),
            new webpack.optimize.RuntimeChunkPlugin({
                name: "runtime"
            })
        ];
        env == "production" && REPORT ? plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        })) : "";
        return env == "production" ? plugins.concat(buildPlugins) : plugins;
    })();
    //代码显示模式
    const DEVTOOL = (() => { return env == "production" ? "" : "eval-source-map"; })();
    //环境
    const MODE = (() => { return env; })();

    let ret = {
        entry: ENTRY,
        output: {
            filename: "js/[name].js",
            path: dist
        },
        externals: {

        },
        resolve: {
            alias: {
                "VUE": "vue/dist/vue.esm.js",
                "vue": "vue/dist/vue.esm.js"
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",

                    options: {
                        presets: ["env"]
                    }
                },
                {
                    test: /\.vue$/,
                    exclude: /node_modules/,
                    loader: "vue-loader",
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [{
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "images/[name].[ext]",
                            // outputPath: "images/",
                            // publicPath: "themes/default/view/images"
                        }
                    }]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: "file-loader",
                    options: {
                        name: "font/[name].[ext]",
                        // outputPath: "font/"
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
        devServer: DEVSERVER,
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