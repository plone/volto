import tsParser from '@typescript-eslint/parser';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules',
      '**/build',
      'packages/volto',
      'packages/volto-guillotina',
      '!**/.*',
      '**/dist',
      'packages/registry/lib',
      'packages/registry/docs',
      'apps/rr7/.react-router',
    ],
  },
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'ESNext',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },

      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },

        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: ['packages/*/tsconfig.json'],
          },
        },
      },
    },

    rules: {},
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:react/recommended',
      'plugin:import/typescript',
      'plugin:prettier/recommended',
    ),
  ).map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx'],

    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import),
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 0,
    },
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'plugin:react/jsx-runtime',
    ),
  ).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
  })),
  {
    files: ['**/*.js', '**/*.jsx'],

    plugins: {
      import: fixupPluginRules(_import),
    },

    rules: {
      'react/prop-types': 0,
      'react/no-unescaped-entities': 0,
    },
  },
];
