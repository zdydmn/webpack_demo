// 生产环境配置
const { merge } = require('webpack-merge') // 合并配置文件
const glob = require('glob')
const { appSrc } = require('../paths')
const common = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

/** @type {import("webpack").Configuration} */
module.exports = merge(common, {
    // 开发工具，开启 source map，编译调试
    devtool: 'eval-cheap-module-source-map',

    plugins: [
        // 打包体积分析
        // new BundleAnalyzerPlugin(),

        // CSS Tree Shaking
        // new PurgeCSSPlugin({
        //     paths: glob.sync(`${appSrc}/**/*`, { nodir: true }),
        // }),

        // 开启 Scope Hoisting
        new ModuleConcatenationPlugin()
    ],
    optimization: {
        minimizer: [
            // css 压缩
            new CssMinimizerPlugin({
                parallel: 4,
            }),

            // // JS压缩
            new TerserPlugin({
                parallel: 4,
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                }
            })
        ],
        // SplitChunksPlugin 开箱即用,抽离重复代码
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10, // 优先级
                    enforce: true
                }
            }
        },

        runtimeChunk: true
    }
})