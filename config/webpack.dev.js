const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require("webpack");
function pathResolve(url) {
    return path.resolve(__dirname, url);
}

module.exports = {
    entry: {
        main: pathResolve("../src"),
        // 分包, 第三方资源包不打包进主包
        vendor: [
            '@babel/polyfill',
            'react',
            'react-dom',
        ]
    },
    mode: "development",
    output: {
        path: pathResolve("../dist"),
        filename: "./js/[name]__bound__[hash:8].js",
        publicPath: "/"
    },
    // 监听
    watch: true,
    watchOptions: {
        poll: 1000, // 每秒询问多少次
        aggregateTimeout: 500,  //防抖 多少毫秒后再次触发
        ignored: /node_modules/ //忽略时时监听
    },
    recordsPath: path.join(__dirname, '../dist/records.json'), // json信息
    devServer: {
        host:'0.0.0.0',
        port: "8080",
        contentBase: "dist",
        hot: true,
        overlay: {
            errors:true
        },
        clientLogLevel: "none",
        compress: true, // 一切服务采用gzip压缩
        quiet: true, // 禁止显示devServer的console信息
        // progress: true, // 显示构建信息
        stats: {
            chunks: false, // 不添加chunk信息
            colors: true,
            modules: false, // 不添加构建模块信息
        }
    },
    devtool: "source-map", // 本地调试工具

    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                use: [
                    {
                        loader: "babel-loader",
                        query: {
                            presets: ['react', 'es2015', '@babel/preset-env']//支持react jsx和ES6语法编译
                        }
                    },
                    {
                        loader: "cache-loader",
                    }
                ],
                exclude: /node_modules/,
                include: pathResolve("../src")
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            // name: "[local]__[name]__[hash:base64:5]",
                            webpackImporter: false,
                            implementation: require('sass'),
                            sassOptions: {
                                indentWidth: 4,
                            }
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|webp|gif|svg)(\?.*)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 8192,
                            name: "[path][name].[ext]",
                            esModule: false, // 这里设置为false
                            // publicPath: "/",
                            emitFile: false,

                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|webp|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: "[path][name].[ext]",
                            limit: 8192,
                            esModule: false, // 这里设置为false
                            fallback: "file-loader",
                            // publicPath: "/"
                        },
                    },
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"],
                            // interpolate: true
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                use: ["json-loader"]
            }
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ProgressBarPlugin({
            // format: 'build [:bar] ' +' (:elapsed seconds)',
            // clear: true
        }),
        new webpack.HotModuleReplacementPlugin({

        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]__[chunkhash:8].css",
            chunkFilename: "[id].css",
            ignoreOrder: false //  启用以删除有关顺序冲突的警告  
        }),
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
    ],
    resolve: {
        alias: {
            "@Pages": pathResolve("../src/Pages"),
            "@Components": pathResolve("../src/Components")
        },
        // 省略文件后缀名
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"],
        cacheWithContext: true,
        // unsafeCache: /src\/utilities/ // 可以用于匹配文件路径或只缓存某些模块
    },

}