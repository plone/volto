module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  root: true,
  rules: {
    'prettier/prettier': 'error',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
};
