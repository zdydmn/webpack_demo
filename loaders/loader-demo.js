// loader 就像一个翻译官，根据test后缀匹配的源文件，将源文件转化为新的格式并输出。
// 如果配置多个loader，会从右向左，依次将上一个loader的结果传递给下一个loader处理，直至结束。
// 在开发loader的时候，一定要保持loader职责的单一性，只需要关心输入和输出
// loader的本质是一个函数

module.exports = function (source) {
    // source 为 compiler 传递给 Loader 的一个文件的原内容
    // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该 Loader 没有做任何转换

    return source
}