var path = require('path');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    
    module: {
        rules: [
            {
                test: /\.ts*/,
                use: [
                    { 
                        loader: 'awesome-typescript-loader',
                        options: {
                            transpileOnly: true,
                            configFileName: 'tsconfig.webpack.json'
                        }
                    },
                    { 
                        loader: 'angular2-template-loader'
                    }
                ]
            }
        ]
    },
    
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});