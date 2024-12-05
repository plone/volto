/** This file is intended to have ESlint configuration only meant to be applied in
 * Volto core. Since it relies on the `VOLTOCONFIG` environment variable, it will
 * not be applied in CI and command line `make lint` in Volto projects.
 * However, it will be applied in IDEs, adding a layer of convenience for developers,
 * so they can adapt to use best practices and future deprecations and changes in
 * Volto core codebase.
 */
let rules;

if (process.env.VOLTOCONFIG) {
  rules = null;
} else {
  rules = {
    'no-restricted-imports': [
      'error',
      {
        name: '@plone/volto/components',
        message:
          'Importing from barrel files is not allowed. The usage of barrel files is discouraged and they will be removed in Plone 7. Please use direct imports of the modules instead.',
      },
      {
        name: '@plone/volto/helpers',
        message:
          'Importing from barrel files is not allowed. The usage of barrel files is discouraged and they will be removed in Plone 7. Please use direct imports of the modules instead.',
      },
      {
        name: '@plone/volto/actions',
        message:
          'Importing from barrel files is not allowed. The usage of barrel files is discouraged and they will be removed in Plone 7. Please use direct imports of the modules instead.',
      },
      {
        name: 'lodash',
        message:
          "Importing directly from `lodash` is not allowed. Please use `import <helper> from 'lodash/<helper>'` instead.",
      },
    ],
  };
}

module.exports = {
  rules,
};
