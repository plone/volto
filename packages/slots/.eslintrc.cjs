/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['../../.eslintrc.cjs', '../eslintconfig/addons.js'],
  ignorePatterns: ['vitest.config.ts'],
};
