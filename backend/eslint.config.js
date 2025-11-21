import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['node_modules', 'dist'],
  },

  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      ...pluginJs.configs.recommended.rules,

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  prettier,
];
