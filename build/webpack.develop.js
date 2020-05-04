const { resolvePath,baseConfig,envConfig } = require('./webpack.base.js');
const webpackMerge = require('webpack-merge');
const Webpack = require('webpack');
// 如果是本地开发，那么public设为／为好
envConfig['PUBLIC_PATH'] = '/';
const config = {
    output:{
        publicPath: envConfig['PUBLIC_PATH']
    },
    module:{
        rules:[
            {
                test: /\.(css|less)/,
                use:['style-loader','css-loader','postcss-loader','less-loader']
            }
        ]
    },
    plugins:[
        new Webpack.DefinePlugin({
            'process.env': JSON.stringify(envConfig)
        }),
    ]
}

module.exports = webpackMerge(baseConfig,config);