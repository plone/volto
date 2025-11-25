module.exports = {
  extends: '../volto/.eslintrc',
  rules: {
    'import/no-unresolved': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@plone/volto-slate', './src']],
      },
    },
  },
};
