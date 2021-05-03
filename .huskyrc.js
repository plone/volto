module.exports = {
  husky: {
    hooks: {
      'pre-commit': 'lint-staged',
      'post-checkout': 'yarnhook',
      'post-merge': 'yarnhook',
      'post-rebase': 'yarnhook',
    },
  },
  'lint-staged': {
    'src/**/*.{js,jsx,ts,tsx,json}': [
      'npx eslint --max-warnings=0 --fix',
      'npx prettier --single-quote --write',
      'yarn test:husky',
    ],
    'src/**/*.{jsx}': ['yarn i18n'],
    'theme/**/*.{css,less}': ['npx stylelint --fix'],
    'src/**/*.{css,less}': ['npx stylelint --fix'],
    'theme/**/*.overrides': ['npx stylelint --fix --syntax less'],
    'src/**/*.overrides': ['npx stylelint --fix --syntax less'],
  },
};
