import loadable from '@loadable/component';

export const Login = loadable(
  () => import('@plone/volto/components/theme/Login/Login'),
);
