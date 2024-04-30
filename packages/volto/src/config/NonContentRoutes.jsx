import config from '@plone/volto/registry';

/**
 * Array of routes that do not require context.
 * @type {Array<string|RegExp>}
 */
export const contextLessRoutes = [
  '/sitemap',
  '/register',
  '/change-password',
  /\/controlpanel\/.*$/,
  '/controlpanel',
  '/personal-information',
  '/personal-preferences',
  /\/passwordreset\/.*$/,
  '/passwordreset',
];

// Non Content Routes/Views
// You can include either RegEx or a string representing the ending of the
// nonContentRoute eg. '/add' will match '/foo/bar/add'
export const nonContentRoutes = [
  /\?.*$/,
  /\/add$/,
  '/aliases',
  '/contents',
  '/delete',
  '/diff',
  /\/edit$/,
  '/historyview',
  '/links-to-item',
  '/layout',
  '/login',
  '/logout',
  '/rules',
  '/sharing',
  '/search',
  '/contact-form',
  '/create-translation',
  '/manage-translations',
  ...contextLessRoutes,
  ...(config.settings?.externalRoutes?.map((route) => route.match.path) || []),
];
