/** @type {import('eslint').Linter.Config} */
module.exports = {
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:react/jsx-runtime', // We only want this for non-library code (eg. volto add-ons)
      ],
    },
  ],
};
