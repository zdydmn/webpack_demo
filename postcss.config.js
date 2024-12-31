module.exports = {
    plugins: [
        require('autoprefixer'), // 自动添加浏览器前缀
        require('postcss-preset-env'), // 使用未来的 CSS 特性
        require('cssnano')({
            preset: 'default'
        })
    ]
};