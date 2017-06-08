var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/app/index.html",
    filename: "index.html",
    inject: "body"
});

module.exports = {
    entry: [
        './app/app.js'
    ],
    output: {
        path: __dirname + '/app',
        filename: "index.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    // module: {
    //     rules: [{
    //         test: /\.js$/,
    //         loader: 'babel-loader',
    //         query: {
    //             presets: [
    //                 'es2015',
    //                 'react'
    //             ],
    //             plugins: []
    //         }
    //     }]        
    // }                    
    //plugins: [HtmlWebpackPluginConfig]
}