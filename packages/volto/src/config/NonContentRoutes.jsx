import config from '@plone/volto/registry';

// Non Content Routes/Views
// You can include either RegEx or a string representing the ending of the
// nonContentRoute eg. '/add' will match '/foo/bar/add'
export const nonContentRoutes = [
  /\?.*$/,
  /\/add$/,
  '/aliases',
  '/contents',
  '/delete',
  /\/diff$/,
  /\/diff\?/,
  /\/edit$/,
  '/historyview',
  '/links-to-item',
  '/layout',
  '/login',
  '/logout',
  '/sitemap',
  '/register',
  '/rules',
  '/sharing',
  '/search',
  '/change-password',
  /\/controlpanel\/.*$/,
  '/controlpanel',
  '/contact-form',
  '/personal-information',
  '/personal-preferences',
  '/register',
  /\/passwordreset\/.*$/,
  '/passwordreset',
  '/create-translation',
  '/manage-translations',
  ...(config.settings?.externalRoutes?.map((route) => route.match.path) || []),
];

// PublicUi routes that are nonContentRoutes, and should not be members of isCmsUi
// Must be a subset of nonContentRoutes !
export const publicNonContentRoutes = [
  '/login',
  '/logout',
  '/sitemap',
  '/register',
  '/search',
  '/change-password',
  '/contact-form',
  '/register',
  /\/passwordreset\/.*$/,
  '/passwordreset',
];
