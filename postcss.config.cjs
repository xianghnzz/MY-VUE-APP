module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: [
                'Android 4.1',
                'iOS 7.1',
                'Chrome > 31',
                'ff > 31',
                'ie >= 8',
                'last 10 versions' // 所有主流浏览器最近10版本用
            ],
            grid: true
        },
        'postcss-pxtorem': {
            rootValue: 192, // 设计稿宽度的1/ 10 本项目设计稿尺寸为1920，这里是192
            propList: ['*', '!border'], // 除 border 外所有px 转 rem
            // minPixelValue: 12, // px小于12的不会被转换
            selectorBlackList: ['#app'] // 过滤掉.el-开头的class，不进行rem转换
        }
    }
};
