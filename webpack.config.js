var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "zepto": "./js/zepto.js",
        "evaluate":"./js/evaluate.js"
    },
    output: {
        path: __dirname + "/build/v20160901",
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                "test": /\.vm?$/, "loader": "html"
            },
            {
                "test": /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                "loader": "url-loader?limit=8000&name=./images-and-fonts/[name].[ext]"
            },
            {
                "test": /\.less/,
                "loader": 'style-loader!css-loader!less-loader'
            },
            {
                "test": /\.css$/,
                "loader": ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    plugins: [
        // CSS打包成文件必须在JS中require，使用插件打包为文件，不然直接打包到页面行内样式
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            Velocity: "velocityjs",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};