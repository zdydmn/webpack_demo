/**
 * EndWebpackPlugin
 * 接受两个函数，在webpack打包完成后执行传入的操作
 */
class EndWebpackPlugin {
    // 在构造函数中获取用户给该插件传入的配置
    constructor({ doneCallback, failCallback }) {
        // 存下在构造函数中传入的回调函数
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }

    // Webpack 会调用 PluginDemo 实例的 apply 方法给插件实例传入 compiler 对象
    apply(compiler) {
        compiler.hooks.done.tap('done', (state) => {
            this.doneCallback(state)
        })

        compiler.hooks.failed.tap('failed', (err) => {
            this.failCallback(err)
        })

        // compiler.hooks.emit.tapAsync('EndWebpackPlugin', (compilation, callback) => {
        //     compilation.chunks.forEach((chunk) => {
        //     })
        // })
    }
}

module.exports = EndWebpackPlugin;