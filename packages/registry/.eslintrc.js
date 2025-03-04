module.exports = {
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      env: {
        node: true,
        es6: true,
      },
      extends: 'eslint:recommended',
      parserOptions: {
        ecmaVersion: 2021, // You can adjust this based on the ECMAScript version you are using
      },
      rules: {
        'no-prototype-builtins': 0,
      },
    },
  ],
};
