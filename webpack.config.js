const path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: './client/src/index.tsx',
    devtool: "source-map",

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    //
    // plugins: [
    //     new HtmlWebpackPlugin({template: './client/src/index.html'})
    // ]
};