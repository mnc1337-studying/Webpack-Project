const eslintJS = require('@eslint/js')
const tseslint = require('typescript-eslint')
const globals = require('globals')

module.exports = [
    { ignores: ['dist', 'node_modules'] },
    eslintJS.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.ts'],
        languageOptions: { globals: globals.browser },
        rules: { 'no-console': 'warn' },
    },
]