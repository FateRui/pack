const { resolvePath,baseConfig } = require('./webpack.base.js');
const webpackMerge = require('webpack-merge');

const config = {
    module:{
        rules:[
            {
                test: /\.(css|less)/,
                use:['style-loader','css-loader','postcss-loader','less-loader']
            }
        ]
    }
}

module.exports = webpackMerge(baseConfig,config);