/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['../../.eslintrc.cjs', 'plugin:react/jsx-runtime'],
  ignorePatterns: ['storybook-static', 'dist'],
};
