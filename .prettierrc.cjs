module.exports = {
    printWidth: 180, // 一行的字符数，如果超过会进行换行，默认为80
    tabWidth: 4, // 一个tab代表4个空格数
    useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
    singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
    quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
    jsxSingleQuote: false, // jsx不使用单引号
    semi: true, // 行位是否使用分号，默认为true
    trailingComma: 'none', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
    bracketSpacing: true, // 对象大括号前后是否有空格，默认为true，效果：{ foo: bar }
    arrowParens: 'avoid', // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
    endOfLine: 'auto',
    proseWrap: 'preserve', // 使用默认的折行标准
    htmlWhitespaceSensitivity: 'css', // 根据显示样式决定 html 要不要折行
    singleAttributePerLine: true // 属性单独占一行
};
