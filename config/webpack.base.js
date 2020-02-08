const path = require("path");
const webpack = require("webpack");

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

// proxy address
const proxyBase = 'http://49.232.173.220:3001'

module.exports = {
    favicon,
    DEFAULT_PORT,
    basePlugins,
    entryBase,
    proxyBase
}