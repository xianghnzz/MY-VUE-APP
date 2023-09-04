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
        'eslint-config-prettier',
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
        sourceType: 'module',
        jsxPragma: 'h',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['@typescript-eslint', 'vue', 'prettier'],
    rules: {
        'vue/multi-word-component-names': 'off', // 不使用驼峰命名
        'no-var': 0, // 使用let和const代替var
        eqeqeq: ['error', 'smart'], // 使用全等（===， !==）
        '@typescript-eslint/no-explicit-any': ['off'] // 允许使用any类型
    }
};
