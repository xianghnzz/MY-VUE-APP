module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-essential',
        'plugin:prettier/recommended',
        './.eslintrc-auto-import.json'
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'vue'],
    rules: {
        'vue/multi-word-component-names': 'off', // 不使用驼峰命名
        'vue/html-indent': ['error', 4], // vue html模板空四格,
        // 'vue/first-attribute-linebreak': [
        //     2,
        //     {
        //         // 单行时，第一属性前不允许使用换行符
        //         singleline: 'beside',
        //         // 多行时，第一属性前必须使用换行符
        //         multiline: 'below'
        //     }
        // ],
        // 'vue/max-attributes-per-line': [
        //     2,
        //     {
        //         // 单行时可以接收最大数量
        //         singleline: 2,
        //         // 多行时可以接收最大数量
        //         multiline: {
        //             max: 1
        //         }
        //     }
        // ],
        indent: ['error', 4, { SwitchCase: 1 }],
        'comma-dangle': ['error', 'never'], // 不允许对象中出现结尾逗号
        'no-var': 0, // 使用let和const代替var
        quotes: ['error', 'single', { avoidEscape: true }], // js中使用单引号
        'jsx-quotes': ['error', 'prefer-double'], // jsx模板中使用双引号
        eqeqeq: ['error', 'smart'], // 使用全等（===， !==）
        'max-len': ['error', { code: 180 }],
        '@typescript-eslint/no-explicit-any': ['off']
    }
};
