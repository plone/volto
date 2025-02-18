const { ESLint } = require('eslint');

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint();
  const ignoredFiles = await Promise.all(
    files.map((file) => eslint.isPathIgnored(file)),
  );
  const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
  return filteredFiles.join(' ');
};
module.exports = {
  'packages/!(volto)/**/*.{js,jsx,ts,tsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    return [
      `eslint --max-warnings=0 ${filesToLint}`,
      'pnpm prettier --single-quote --write',
    ];
  },
  'packages/volto/**/*.{js,jsx,ts,tsx}': [
    'pnpm --filter @plone/volto lint:husky',
    'pnpm --filter @plone/volto prettier:husky',
  ],
  'packages/volto/src/**/*.{jsx, tsx}': ['pnpm --filter @plone/volto i18n'],
  'packages/!(volto)/**/*.{css,less,scss}': ['pnpm stylelint --fix'],
  'packages/volto/**/*.{css,less,scss}': [
    'pnpm --filter @plone/volto stylelint --fix',
  ],
  'packages/volto/**/*.overrides': [
    'pnpm --filter @plone/volto stylelint --fix',
  ],
};
