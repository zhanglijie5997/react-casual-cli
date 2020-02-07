const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");// 构建加速
const webpack = require("webpack");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin")
const openBrowser = require("react-dev-utils/openBrowser");
const favicon = require("./webpack.base").favicon
const DEFAULT_PORT = "3001"
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
        filename: "js/[name]__bound__[hash:8].js",
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
        host: '0.0.0.0',
        port: DEFAULT_PORT,
        contentBase: "dist",
        hot: true,
        overlay: true,
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
                exclude: /node_modules/,
                include: pathResolve("../src"),
                enforce: "pre", // 编译前检查
                use: [
                    {
                        loader: "eslint-loader",

                        options: {
                            sourceMaps: true,
                            formatter: require("eslint-friendly-formatter")
                        }
                    },
                    {
                        loader: "babel-loader",
                        query: {
                            presets: ['react', 'es2015', '@babel/preset-env']//支持react jsx和ES6语法编译
                        }
                    },
                    {
                        loader: "cache-loader",
                    },

                ],

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
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            },
                            sourceMap: true,
                        },

                    },
                    {
                        loader: "sass-loader",
                        options: {
                            webpackImporter: false,
                            implementation: require('sass'),
                            sassOptions: {
                                indentWidth: 4,
                            }
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")
                            ]
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
        // 预请求资源加载模块 
        // content 普通模块的 文件夹的绝对路径
        // request 普通模块的 request 字符串
        // new webpack.PrefetchPlugin([content],request),
        // 避免按需加载产生更多的chunk，超过数量/大小会被合并
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 15, // 必须大于或等于 1
            minChunkSize: 10000
        }),
        // 通过合并小于 minChunkSize 大小的 chunk，将 chunk 体积保持在指定大小限制以上。
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000 // Minimum number of characters
        }),
        // 确保npm install <library>强制进行项目重建。
        new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
            PUBLIC_URL: "../public/"
        }),
        new webpack.NamedModulesPlugin(),
        // 不必要到处import require
        new webpack.ProvidePlugin({
            React: "react"
        }),
        new HardSourceWebpackPlugin(),
        // 忽略热更新文件
        // new webpack.WatchIgnorePlugin(""),
        new ProgressBarPlugin({
            // format: 'build [:bar] ' +' (:elapsed seconds)',
            // clear: true
        }),
        new webpack.HotModuleReplacementPlugin({

        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: "./public/index.html",
            inject: true,
            minify: {
                //是否对大小写敏感，默认false
                caseSensitive: true,
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
                collapseBooleanAttributes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,  // 使用短的文档类型，默认false
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true, // 删除style的类型属性， type="text/css" 同上
                keepClosingSlash: true,
                minifyJS: true,// 压缩内联js
                minifyCSS: true, // 压缩内联css
                minifyURLs: true,
            },
            favicon: favicon
        }),
    ],
    resolve: {
        alias: {
            "@Utils": pathResolve("../src/Utils"),
            "@Static": pathResolve("../src/Static"),
            "@Pages": pathResolve("../src/Pages"),
            "@Components": pathResolve("../src/Components")
        },
        // 省略文件后缀名
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"],
        cacheWithContext: true,
        // unsafeCache: /src\/utilities/ // 可以用于匹配文件路径或只缓存某些模块
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}

if (openBrowser("http://localhost:"+ DEFAULT_PORT)) {
    console.log(`open browser success 🔥`);
}