import pluginJs from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default defineConfig([
  // ✔ Next.js recommended configs
  ...nextVitals,
  ...nextTs,

  // ✔ Custom ignore patterns
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']),

  // ✔ Your custom rules + plugins
  {
    languageOptions: {
      globals: {
        ...globals.browser,
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

      // --- Import Sorting Rules ---
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // ✔ Disable rules that conflict with Prettier
  prettier,
]);
