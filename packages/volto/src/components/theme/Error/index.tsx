import loadable from '@loadable/component';

export const ServerError = loadable(
  () => import('@plone/volto/components/theme/Error/ServerError'),
);
