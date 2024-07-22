import tsEslint from 'typescript-eslint'
import eslintJS from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'

const compat = new FlatCompat()

export default tsEslint.config(
  eslintJS.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    ignores: ['dist'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.esnext,
      },
    },
  },
  // Typescript
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...compat.config(importPlugin.configs.recommended)],
    settings: {
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  }
)
