import type { RouteConfig } from '@react-router/dev/routes';
import { index, prefix, route } from '@react-router/dev/routes';
import { getAddonRoutesConfig } from '@plone/react-router';
import config from '@plone/registry';
// eslint-disable-next-line import/no-unresolved
import applyAddonConfiguration, { addonsInfo } from '../registry.loader';

applyAddonConfiguration(config);

const routes: RouteConfig = [
  index('routes/index.tsx', { id: 'index' }),
  ...prefix('edit', [
    index('routes/edit.tsx', { id: 'edit-index' }),
    route('*', 'routes/edit.tsx', { id: 'edit' }),
  ]),
  route('login', 'auth/login.tsx', { id: 'login' }),
  route('ok', 'routes/okroute.tsx', { id: 'ok' }),
  ...getAddonRoutesConfig(config.routes || [], addonsInfo),
];

export default routes;
