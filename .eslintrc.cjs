// @ts-check

/** @type {import('eslint').Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 'ESNext', // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // 'import/no-unresolved': ['error', { ignore: ['^@plone/'] }],
    // 'import/extensions': 'off',
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        // node: {
        //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // },
        typescript: {
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

          // use an array of glob patterns
          project: [
            'packages/*/tsconfig.json',
            // 'other-packages/*/tsconfig.json',
          ],
        },
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint', 'import'],
      extends: [
        // 'plugin:@typescript-eslint/eslint-recommended',
        // 'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        // 'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
        // 'plugin:react/jsx-runtime', // We only want this for non-library code (eg. volto add-ons)
        // 'plugin:storybook/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 0,
      },
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      plugins: ['import'],
      extends: [
        'plugin:react/recommended',
        // 'plugin:import/recommended',
        'plugin:prettier/recommended',
        'plugin:react/jsx-runtime',
        // 'plugin:storybook/recommended',
      ],
      rules: {
        'react/prop-types': 0,
        'react/no-unescaped-entities': 0,
      },
    },
  ],
};

module.exports = config;
