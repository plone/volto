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
  import: importPlugin,
  // node: pluginNode,
};

const jsRules = {
  // ...javascriptRules,
  // ...typescriptRules,
  // ...importRules,
  // ...nodeRules,
  // ...stylisticRules,
};

const JS_GLOB_INCLUDE = ['**/*.{ts,tsx,js,jsx}'];

export default tseslint.config(
  // eslint.configs.recommended,
  // tseslint.configs.recommended,
  // reactPlugin.configs.flat.recommended,
  // // reactPlugin.configs.flat['jsx-runtime'],
  // importPlugin.flatConfigs.recommended,
  // prettierPlugin,
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
      parserOptions: {
        project: true,
        parser: tseslint.parser,
      },
      // globals: {
      //   ...globals.browser,
      // },
    },
    plugins: jsPlugins,
    rules: jsRules,
  },
  {
    name: 'plone/ignores',
    ignores: [
      '**/node_modules',
      '**/build',
      '**/storybook-static/*',
      '**/.storybook/*',
      'packages/volto/*',
      'packages/volto-guillotina',
      '!**/.*',
      '**/dist',
      'packages/registry/lib',
      'packages/registry/docs',
      'apps/rr7/.react-router',
    ],
  },
);
