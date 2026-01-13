import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json', 'packages/*/tsconfig.json', 'apps/*/tsconfig.json'],
        },
        node: true,
      },
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ['dist/**'],
  },
  {
    rules: {
      'import/no-cycle': 'error',
      'import/no-unresolved': ['error', { ignore: ['.svg', '.png', 'gif'] }],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      // '@typescript-eslint/prefer-as-const': 0,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    plugins: {
      'jsx-a11y': pluginJsxA11y,
    },
    rules: {
      ...pluginJsxA11y.configs.recommended.rules,
    },
  },
]
