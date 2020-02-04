const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");//用来抽离单独抽离css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const ManifestPlugin = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const os = require("os");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
function pathResolve(url) {
    return path.resolve(__dirname, url);
}
module.exports = {
    entry: {
        main: [pathResolve("../src")],
        // 分包, 第三方资源包不打包进主包
        vendor: [
            '@babel/polyfill',
            // 'react',
            // 'react-dom',
        ]
    },
    mode: "production",
    output: {
        filename: "js/[name]__bound__[hash:5].js",
        path: pathResolve("../dist"),
        publicPath: "./",
    },

    recordsPath: path.join(__dirname, '../dist/records.json'),

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
                    }
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        // { loader: require.resolve("style-loader") },
                        {
                            loader: require.resolve("css-loader"),
                            options: {
                                modules: {
                                    localIdentName: '[name]__[local]__[hash:base64:5]'
                                },
                            }
                        },
                        {
                            loader: require.resolve("sass-loader"),
                            options: {
                                webpackImporter: false,
                                implementation: require('sass'),
                                sassOptions: {
                                    indentWidth: 4,
                                }
                            }
                        },
                        {
                            loader: require.resolve("postcss-loader"),
                        },
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|webp|gif|svg)(\?.*)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 8192,
                            name: "images/[name].[ext]",
                            esModule: false, // 这里设置为false
                            // publicPath: "./",
                            emitFile: false,
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
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
                            name: "images/[name].[ext]",
                            limit: 8192,
                            esModule: false, // 这里设置为false
                            fallback: "file-loader",
                            // publicPath: "./"
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
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
       
        new BundleAnalyzerPlugin(),
        new ManifestPlugin({
            filename: "asset-manifest.json"
        }),
        // new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
        new HappyPack({
            id: "js",
            threadPool: happyThreadPool,
            loaders: ['babel-loader']
        }),
        new HappyPack({
            id: "styles",
            threadPool: happyThreadPool,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }),
        new CompressionWebpackPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
        }),
        new UglifyJsPlugin({
            test: [/\.js($|\?)/i],
            // 允许并发
            parallel: 4,
            cache: true,

            uglifyOptions: {
                ie8: false,
                ecma: 8,
                compress: {
                    // ecma: 5,
                    inline: 1,

                    // 删除console
                    drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.log']//移除console
                },
                output: {
                    // 不保留注释
                    // comment: false,
                    // 使输出的代码尽可能紧凑
                    beautify: false
                }
            }

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
            }
        }),
        new ExtractTextPlugin("css/styles.css"),//抽离出来以后的css文件名称
        new OptimizeCssAssetsPlugin(),//执行压缩抽离出来的css
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, "../dist/dll/react/*.dll.js")
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("../dist/dll/react/react.manifest.json")
        }),
    ],
    resolve: {
        // 路径别名
        alias: {
            "@Pages": pathResolve("../src/Pages"),
            "@Components": pathResolve("../src/Components")
        },
        // 省略文件后缀名
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".mjs"]
    },
    // 给定一个创建后超过 250kb 的资源：
    performance: {
        hints: false,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial"
                }
            }
        }
    },
}   