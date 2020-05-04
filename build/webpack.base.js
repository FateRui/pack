const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const Path = require('path');
const resolvePath = dir=> Path.join(__dirname,'..',dir);
const { NODE_MODE, NODE_ENV } = process.env;
const isProdcution = NODE_MODE === 'production'? true: false;
const envConfig = require(resolvePath('config/index.js'))[NODE_ENV];
const baseConfig = {
    mode: process.env.NODE_MODE,
    devtool: !isProdcution? 'source-map':'none',
    entry:{
        index: resolvePath('src/index.js')
    },
    output:{
        path: resolvePath('dist'),
        filename: 'static/js/[name].[hash:7].js'
    },
    devServer:{
        contentBase: resolvePath('dist'),
        hot: true,
        progress: true,
        open: true,
        host: '0.0.0.0',
        useLocalIp: true,
        stats: 'errors-only',
        compress: true
    },
    resolve:{
        alias: {
            '@': resolvePath('')
        },
        extensions: ['.js','.vue'],
        modules:[resolvePath('node_modules')]
    },
    module:{
        rules:[
            {
                test: /\.(png|svg|gif|bmp|jpg|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 30 * 1024,
                            name: 'static/imgs/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {   loader: 'file-loader',
                        options:{
                            name: 'static/fonts/[name].[hash:7].[ext]'
                        }
                    }
                ]
                
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: resolvePath('public/index.html'),
            name: 'index.html',
            minify: {
                removeComments: true, //去除HTML注释
                collapseWhitespace: true, //去掉空格
                minifyJS: true, // 压缩html里的js（使用uglify-js进行的压缩）
                minifyCSS: true, // 压缩html里的css（使用clean-css进行的压缩）
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: resolvePath('public'),
                to: resolvePath('dist')
            }
        ])
    ]
}

module.exports = {
    resolvePath,
    baseConfig,
    envConfig
}