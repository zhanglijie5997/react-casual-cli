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
        // 设置环境变量
        new webpack.DefinePlugin({
            VERSION: "1.0.0",
            "process.env": {
                NODE_ENV: JSON.stringify(NODE_ENV) ,
                REACT_APP_URL: JSON.stringify('https://www.baidu.com'),
                BASE_URL: JSON.stringify("zhanglijie")
            }
        }),
    ]
}

module.exports = {
    favicon,
    DEFAULT_PORT,
    basePlugins
}