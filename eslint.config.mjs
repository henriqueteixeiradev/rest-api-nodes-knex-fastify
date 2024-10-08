import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'no-console': 'off',
            'no-useless-catch': 'off',
            indent: ['error', 4],
            'linebreak-style': [
                'error',
                process.platform === 'win32' || process.platform === 'win64'
                    ? 'windows'
                    : 'unix',
            ],
            quotes: ['warn', 'single'],
            semi: ['error', 'always'],
            'eol-last': ['error', 'always'],
        },
    },
];
