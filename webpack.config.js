var webpack = require('webpack');

module.exports = {
    entry: {
        about: __dirname + '/app/js/about.js'
            // prefs: __dirname + '/app/js/prefs.js',
            // app: __dirname + '/app/js/app.js'
    },
    output: {
        path: __dirname + '/app/built',
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:8080/built'
    },
    devServer: {
        contentBase: __dirname + '/app',
        publicPath: 'http://localhost:8080/built'
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: { presets: ['react', 'es2015', 'stage-0'] }
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            { test: /\.svg$/, loader: 'url-loader??limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url-loader??limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url-loader??limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url-loader??limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url-loader??limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
        ]

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(new RegExp("^(electron|fs|ipcMain|ipcRender|path|nconf)$"))
    ]
}