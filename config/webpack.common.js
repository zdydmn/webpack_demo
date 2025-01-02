// 通用配置
const { appDist, appSrc, appHtml, appEntry } = require('../paths');
const chalk = require('chalk')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EndWebpackPlugin = require('../plugins/plugin-demo');

const DEV_MODE = process.env.NODE_ENV !== "production";

/** @type {import("webpack").Configuration} */
module.exports = {
    // 编译入口
    entry: appEntry,

    // 输出
    output: {
        // 输出文件名
        filename: '[name]-[hash].js',
        // 输出目录
        path: appDist,
        // 编译前清除目录
        clean: true
    },

    cache: {
        type: "filesystem" // 使用文件缓存
    },

    resolve: {
        alias: {
            '@': appSrc,
        },
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.sass'], // 省略的后缀名，会优先在这个list中寻找
        mainFields: ['browser', 'module', 'main'] // 配置第三方模块使用哪个入口文件
    },


    module: {
        // 配置loader
        rules: [
            {
                // 使用esbuild-loader替代babel-loader处理js和jsx
                test: /\.(tsx|ts|js|jsx)$/,
                use: [{
                    loader: 'esbuild-loader',
                    options: {
                        // 处理tsx
                        loader: 'tsx',
                        target: 'es2015',
                    }
                }],
                exclude: /node_modules/,
                include: [appSrc]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                include: [appSrc],
                type: 'asset/resource',
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/i,
                include: [appSrc],
                type: 'asset/resource',
            },
            {
                test: /\.(c|sa|sc)ss$/,
                include: [appSrc],
                exclude: /\.module\.scss/i,
                use: [
                    DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: 'icss',
                            },
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
            },
            {
                test: /\.module\.(scss|sass)$/,
                include: [appSrc],
                use: [
                    DEV_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                            },
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
            }
        ],
    },

    // 配置plugin
    plugins: [
        // 配置HTML模版
        new HTMLWebpackPlugin({
            template: appHtml, // 摸板地址
            filename: 'index.html', // 输出的文件名
        }),
        // 配置编译进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),

        new EndWebpackPlugin({
            doneCallback() {
                console.log('打包完成');
            },
            failCallback(err) {
                console.error(err);
            }
        })
    ],


}