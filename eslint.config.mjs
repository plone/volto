// @ts-check

// import eslint from '@eslint/js';
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import betterTailwind from 'eslint-plugin-better-tailwindcss';

const JS_GLOB = ['**/*.{ts,tsx,js,jsx}'];

const generateFilesArray = (packages) => {
  return packages.map((pkg) => `**/${pkg}/**/*.{tsx,jsx}`);
};
// '**/packages/blocks/**/*.{ts,tsx}'
const addonPackages = [
  'apps/seven',
  'apps/quanta',
  'packages/blocks',
  'packages/contents',
  'packages/cmsui',
  'packages/coresandbox',
  'packages/layout',
  'packages/theming',
  'packages/publicui',
  'packages/plate',
  // Add more packages as needed
];

export default tseslint.config(
  reactPlugin.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  prettierPlugin,
  jsxA11y.flatConfigs.recommended,
  tseslint.configs.recommended,
  {
    name: 'General ESlint Config',
    files: JS_GLOB,
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
      'no-alert': 'warn',
      'no-debugger': 'warn',
      'react/no-children-prop': 'off',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: ['packages/*/tsconfig.json', 'apps/seven/tsconfig.json'],
          alwaysTryTypes: true,
        },
        node: true,
      },
    },
  },
  {
    name: 'TypeScript Specific - Rules',
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 0,
    },
  },
  {
    name: 'JS React - Rules',
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'react/prop-types': 0,
      'react/no-unescaped-entities': 0,
    },
  },
  {
    name: 'Addons - JSX Runtime plugin',
    files: generateFilesArray(addonPackages),
    ...reactPlugin.configs.flat['jsx-runtime'],
  },
  {
    name: 'Addons - Rules',
    files: generateFilesArray(addonPackages),
    rules: {
      'no-console': 'warn',
    },
  },
  {
    name: 'Tailwind Readability',
    files: ['**/*.{tsx,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'better-tailwindcss': betterTailwind,
    },
    rules: {
      // enable all recommended rules to report a warning
      ...betterTailwind.configs['recommended-warn'].rules,
      // enable all recommended rules to report an error
      ...betterTailwind.configs['recommended-error'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': [
        'warn',
        {
          printWidth: 100,
          classesPerLine: 0,
          group: 'newLine',
          preferSingleLine: false,
        },
      ],
      'better-tailwindcss/enforce-consistent-class-order': [
        'warn',
        {
          order: 'improved',
        },
      ],
      'better-tailwindcss/no-duplicate-classes': 'warn',
      'better-tailwindcss/no-unnecessary-whitespace': 'warn',
    },
    settings: {
      'better-tailwindcss': {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: 'apps/seven/publicui.css',
        // entryPoint: 'packages/theming/styles/tailwind.css',
      },
    },
  },
  {
    name: 'General Ignores',
    ignores: [
      '**/node_modules',
      '**/build',
      '**/storybook-static/*',
      '**/.storybook/*',
      'packages/volto/*',
      'packages/coresandbox/*',
      'packages/volto-slate',
      '!**/.*',
      '**/dist',
      '**/*.config.ts',
      '**/*.config.js',
      'packages/registry/lib',
      'packages/registry/docs',
      '**/.react-router/*',
      '**/+types/*',
      '**/registry.loader.js',
    ],
  },
);
