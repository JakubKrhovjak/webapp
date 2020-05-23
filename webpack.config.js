const path = require("path");
const  HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        javascript: "./client/src/index.tsx",
        // html: "./client/public/index.html",
    },
    devtool: "source-map",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        port: 3000
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
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]",
            },
        ],
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.esj"
        }),
    ]
};