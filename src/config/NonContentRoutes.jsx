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
  '/diff',
  /\/edit$/,
  '/historyview',
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
