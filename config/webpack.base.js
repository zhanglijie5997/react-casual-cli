const path = require("path");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
// vw
const PostcssAspectRatioMini = require("postcss-aspect-ratio-mini");
const PostcssCssNext = require("postcss-cssnext");
const PostcssWriteSvg = require("postcss-write-svg");
const cssnano = require("cssnano");

// @params {number} vw base 
const DEFAULT_WIDTH = 1920;

// favicon browser favicon
const favicon = path.resolve(__dirname, "../public/favi.ico")

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
        new CaseSensitivePathsPlugin({
            debug: true
        })
    ]
}

// entry
const entryBase = {
    "main": [path.resolve(__dirname,"../src")],
    "vendor/babel-polyfill": [
        '@babel/polyfill',
    ],
    "vendor/react": "react",
    "vendor/react-dom": "react-dom"
}

// vw 
const vwBase = [
    require('postcss-px-to-viewport')({
        "viewportWidth": DEFAULT_WIDTH,
        "unitPrecision": 3,
        "viewportUnit": "vw",
        "selectorBlackList": [".ignore",'.hairlines','common'],
        "minPixelValue": 1,
        "mediaQuery": false,
        "exclude":/(\/|\\)(node_modules)(\/|\\)/ 
      }),
      PostcssAspectRatioMini({}),
      PostcssWriteSvg({
        utf8: false
      }),
      PostcssCssNext({}),
      cssnano({
        preset: "advanced", 
        autoprefixer: false, 
        "postcss-zindex": false 
      }),
];

// proxy address
const proxyBase = 'http://49.232.173.220:3001'

module.exports = {
    favicon,
    DEFAULT_PORT,
    basePlugins,
    entryBase,
    proxyBase,
    vwBase
}