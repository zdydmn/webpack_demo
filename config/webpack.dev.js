// 开发环境配置

const { merge } = require('webpack-merge') // 合并配置文件
const common = require('./webpack.common')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin()


/** @type {import("webpack").Configuration} */
//smp.wrap 开启构建速度分析
module.exports = smp.wrap(merge(common, {
    // 配置开发服务器
    devServer: {
        compress: true, // 自动压缩服务器响应的内容
        hot: true, // 开启热更新
        // open: true, // 启动后自动打开浏览器窗口
        port: 8080, // 端口号
    },
})) 