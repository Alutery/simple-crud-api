module.exports = {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    }
}