const ZipWebpackPlugin = require('zip-webpack-plugin');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressWebpackPlugin = require('compression-webpack-plugin');
const Webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { resolvePath,baseConfig,envConfig,isProdcution } = require('./webpack.base.js');
const config = {
    output:{
        publicPath: envConfig['PUBLIC_PATH']
    },
    optimization:{
        splitChunks:{
            chunks: 'all',
            minSize: 30 * 1024,
            maxSize: 500* 1024,
            cacheGroups: {
                vendor: {
                    test: /\/node_modules\//,
                    minChunks: 2,
                    chunks: 'all',
                    name: 'vendor'
                },
                styles:{
                    test: /\.(css)$/,
                    minChunks: 1,
                    minSize: 30* 1024,
                    maxSize: 500 * 1024,
                    name: 'style'
                }
            }
        },
        minimizer:[
            new TerserWebpackPlugin({
                test: /\.(js)$/,
                terserOptions: {
                    compress: {
                        drop_console: true,
                        warnings: false,
                    },
                },
            })
        ]
    },
    module:{
        rules:[
            {
                test: /\.(css|less)/,
                use:[{
                    loader: MiniCssExtractPlugin.loader
                },'css-loader','postcss-loader','less-loader']
            }
        ]
    },
    plugins:[
        new Webpack.DefinePlugin({
            'process.env': JSON.stringify(envConfig)
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[hash:7].css",
            chunkFilename: "static/css/[id].[hash:7].css"
        }),
        new ZipWebpackPlugin({
            path: resolvePath(''),
            filename: 'dist.zip'
        })
    ]
}
// 如果是生产模式，配置gzip压缩
if(isProdcution){
    config.plugins.push(
        new CompressWebpackPlugin({
            test: /\.(js|css)$/,
            // threshold: 10240,
            minRatio: 0.8
        })
    )
}
module.exports = webpackMerge(baseConfig,config);
