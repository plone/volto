// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import cypressPlugin from 'eslint-plugin-cypress/flat';
// import globals from 'globals';

const jsPlugins = {
  // '@stylistic/js': stylisticJs,
  '@typescript-eslint': tseslint.plugin,
  // import: importPlugin,
  // node: pluginNode,
};
// console.dir(prettierPlugin, { depth: null });

const JS_GLOB_INCLUDE = ['**/*.{ts,tsx,js,jsx}'];

export default tseslint.config(
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  importPlugin.flatConfigs.recommended,
  prettierPlugin,
  // eslint.configs.recommended,
  // tseslint.configs.recommended,
  // // reactPlugin.configs.flat['jsx-runtime'],
  // cypressPlugin.configs.globals,
  // {
  //   files: ['**/*.js', '**/*.jsx'],

  //   plugins: {
  //     import: importPlugin,
  //   },

  //   rules: {
  //     'react/prop-types': 0,
  //     'react/no-unescaped-entities': 0,
  //   },
  // },
  {
    name: 'plone/setup',
    files: JS_GLOB_INCLUDE,
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
      parser: tseslint.parser,
      // parserOptions: {
      //   ecmaFeatures: {
      //     jsx: true, // Allows for the parsing of JSX
      //   },
      // },
      // globals: {
      //   ...globals.browser,
      // },
    },
    rules: {
      // 'no-unused-disable': 2,
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 0,
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'react/prop-types': 0,
      'react/no-unescaped-entities': 0,
    },
  },
  {
    name: 'plone/ignores',
    ignores: [
      '**/node_modules',
      '**/build',
      '**/storybook-static/*',
      '**/.storybook/*',
      'packages/volto/*',
      'packages/coresandbox/*',
      'packages/volto-guillotina',
      'packages/volto-slate',
      '!**/.*',
      '**/dist',
      '**/*.config.ts',
      '**/*.config.js',
      'packages/registry/lib',
      'packages/registry/docs',
      'apps/rr7/.react-router',
    ],
  },
);
