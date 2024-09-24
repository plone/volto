import loadable from '@loadable/component';

export const PasswordReset = loadable(
  () => import('@plone/volto/components/theme/PasswordReset/PasswordReset'),
);

export const RequestPasswordReset = loadable(
  () =>
    import('@plone/volto/components/theme/PasswordReset/RequestPasswordReset'),
);
