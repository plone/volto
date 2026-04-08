/** @type {import('eslint').Linter.Config} */
module.exports = {
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs', '**/*.jsx'],
      env: {
        node: true,
        es6: true,
      },
      extends: 'eslint:recommended',
      parserOptions: {
        ecmaVersion: 'latest',
      },
      rules: {
        'no-prototype-builtins': 0,
      },
    },
  ],
};
