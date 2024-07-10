/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: 'next/core-web-vitals',
  ignorePatterns: ['.next/**', 'dist/**', 'node_modules/**'],
  settings: {
    next: {
      rootDir: 'apps/nextjs/',
    },
  },
};
