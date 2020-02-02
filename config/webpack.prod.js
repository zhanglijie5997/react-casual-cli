const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
    mode: "production",
    output: {
        filename: "./js/[name]__bound.js",
        path: pathResolve("../dist"),
        publicPath: ""
    },
    
    recordsPath: path.join(__dirname, '../dist/records.json'),
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
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
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
        new MiniCssExtractPlugin({
            filename:"./css/[name]__[chunkhash:8].css",
            chunkFilename: "./css/[name]__[id]__[chunkhash:5].css",
            ignoreOrder: false //  启用以删除有关顺序冲突的警告  
        }),
        
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                use: [
                    {
                        loader: "babel-loader",
                        query: {
                            presets: ['react', 'es2015']//支持react jsx和ES6语法编译
                        }
                    }
                ],
                exclude: /node_modules/,
                include: pathResolve("../src")
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    { loader: "style-loader" },

                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },

                    {
                        loader: "css-loader",
                        // options: { modules: true } 
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
            }
        ],
    },
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