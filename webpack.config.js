var webpack = require('webpack');
module.exports = {
    context: __dirname + '/public/app',
    entry: {
        app: './app.js',
        vendor: ['angular']
    },
    output: {
        path: __dirname + '/public/app',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(“vendor”, “vendor.bundle.js”)
    ]
};
