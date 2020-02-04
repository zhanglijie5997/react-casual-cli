const path = require("path");
const webpack = require("webpack");
module.exports = {
    mode: "production",
    entry: {
        react: ["react", "react-dom"]
    },
    output: {
        filename: "[name].dll.js",
        path:  path.resolve(__dirname, '../dist/dll/react'),
        library: "[name]__libary"
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            name: "[name]__libary",
            path: path.join(__dirname, "../dist/dll/react/[name].manifest.json")
        })
    ]
}