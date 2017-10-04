var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/app/main.ts',
    
    resolve: {
        extensions: ['.js', '.ts'],
        
        // An array of directory names to be resolved to the current directory
        modules: [path.resolve(__dirname, 'src') , path.resolve(__dirname, 'node_modules')],
    },
    
    module: {
        rules: [
            {
                test: /\.html$/,
                loaders: ['html-loader']
            },
            {
                test: /\.css$/,
                loaders: ['raw-loader']
            }
        ],
        exprContextCritical: false
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};