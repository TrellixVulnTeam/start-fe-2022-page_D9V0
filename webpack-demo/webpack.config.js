const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },

    output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
    },

    plugins: [
    new HtmlWebpackPlugin({
        title: 'Project Demo',
        minify: {
        collapseWhitespace: true
        },
        hash: true,
        template: './src/index.html'
    })],

    module: {
        rules: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"] 
          }
        ]
      },

    devServer: {
        static: {
          directory: path.resolve(__dirname, 'dist')
        },
        port: 8080
      }
};