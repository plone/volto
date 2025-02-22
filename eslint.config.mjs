// @ts-check

// import eslint from '@eslint/js';
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const JS_GLOB_INCLUDE = ['**/*.{ts,tsx,js,jsx}'];

const generateFilesArray = (packages) => {
  return packages.map((pkg) => `**/${pkg}/**/*.{tsx,jsx}`);
};
// '**/packages/blocks/**/*.{ts,tsx}'
const addonPackages = [
  'apps/seven',
  'packages/blocks',
  'packages/contents',
  'packages/cmsui',
  'packages/coresandbox',
  'packages/slots',
  'packages/theming',
  // Add more packages as needed
];

export default tseslint.config(
  reactPlugin.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  prettierPlugin,
  jsxA11y.flatConfigs.recommended,
  tseslint.configs.recommended,
  {
    name: 'plone/setup',
    files: JS_GLOB_INCLUDE,
    languageOptions: {
      ecmaVersion: 2020,
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'react/jsx-key': [2, { checkFragmentShorthand: true }],
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.tsx', '.jsx'] },
      ],
      'no-alert': 1,
      'no-console': 1,
      'no-debugger': 1,
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
    name: 'Specific rules for TypeScript',
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 0,
    },
  },
  {
    name: 'Specific rules for JS React',
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'react/prop-types': 0,
      'react/no-unescaped-entities': 0,
    },
  },
  {
    name: 'plone/addons',
    files: generateFilesArray(addonPackages),
    ...reactPlugin.configs.flat['jsx-runtime'],
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
      '**/+types/*',
    ],
  },
);
