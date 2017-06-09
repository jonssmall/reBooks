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
}