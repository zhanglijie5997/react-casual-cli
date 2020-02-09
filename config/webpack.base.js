const path = require("path");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
// favicon browser favicon
const favicon = path.resolve(__dirname, "../public/favi.ico")
const TsconfigPathsConfig = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
// port
const DEFAULT_PORT = "3001"

// webpack plugins
/**
 * @param {string} NODE_ENV development | production 
 */
const basePlugins = (NODE_ENV) => {
    return [
        // setting env
        new webpack.DefinePlugin({
            VERSION: "1.0.0",
            "process.env": {
                NODE_ENV: JSON.stringify(NODE_ENV),
                REACT_APP_URL: JSON.stringify('https://www.baidu.com'),
                BASE_URL: JSON.stringify("zhanglijie")
            }
        }),
        new CaseSensitivePathsPlugin(),
       
        new ForkTsCheckerWebpackPlugin({
            async: false,
            silent: true,
            // watch: path.resolve(__dirname, "../src"),
            tsconfig: path.resolve(__dirname, "../tsconfig.json")
        }),
    ]
}

// base resolve
const resolveBase = [
    new TsconfigPathsConfig({
        configFile: path.resolve(__dirname, "../tsconfig.json")
    }),
]

// entry
const entryBase = {
    "main": [path.resolve(__dirname,"../src")],
    "vendor/babel-polyfill": [
        '@babel/polyfill',
    ],
    "vendor/react": "react",
    "vendor/react-dom": "react-dom"
}

// proxy address
const proxyBase = 'http://49.232.173.220:3001'

module.exports = {
    favicon,
    DEFAULT_PORT,
    basePlugins,
    entryBase,
    proxyBase,
    resolveBase
}