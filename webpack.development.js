const path = require("path");
const common = require('./webpack.common');
const merge = require('webpack-merge');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = merge(common, {
    devtool: "none",
    mode: "development",
    plugins: [new ExtractCssChunks()],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [ExtractCssChunks.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif|ttf|woff2|woff|eot)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                            context: path.resolve(__dirname, "src/"),
                            outputPath: ".",
                            publicPath: ".",
                            useRelativePaths: true
                        }
                    },
                ]
            }
        ],
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        // 如果希望局域网其他设备访问，取消下面注释并替换 IP 为本机实际 IP
        // public: '192.168.1.100:8080',
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        open: false,
    }
});