/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: ['storybook-static', 'dist'],
  overrides: [
    {
      files: ['**/*.{ts,tsx, js, jsx}'],
      extends: [
        'plugin:react/jsx-runtime', // We only want this for non-library code (eg. volto add-ons)
      ],
      rules: {
        'import/no-unresolved': 1,
        'import/named': 'error',
        'react/jsx-key': [2, { checkFragmentShorthand: true }],
      },
    },
  ],
};
