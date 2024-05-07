import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.mocha,
                ...globals.node,
            },
        },
    },
    pluginJs.configs.recommended,
    {
        ignores: ['node_modules/*', './eslint.config.js', './src/configs/*'],
    },
    {
        rules: {
            indent: ['error', 4],
            'no-trailing-spaces': 'error',
            semi: ['error', 'always'],
            'eol-last': ['error', 'always'],
            quotes: ['error', 'single'],
        },
    },
];
