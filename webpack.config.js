const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    target: 'node',
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    resolve: {
        fallback: {
            os: require.resolve('os-browserify/browser'),
            http: require.resolve('stream-http'),
            path: require.resolve('path-browserify'),
            fs: false
        }
    }
}