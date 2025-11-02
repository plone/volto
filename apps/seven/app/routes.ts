import type { RouteConfig } from '@react-router/dev/routes';
import type { ReactRouterRouteEntry } from '@plone/types';
import { route } from '@react-router/dev/routes';
import { getAddonRoutesConfig } from '@plone/react-router';

// eslint-disable-next-line import/no-unresolved
import addonsRoutes from '../.plone/registry.routes.json';
// eslint-disable-next-line import/no-unresolved
import addonsInfo from '../.plone/registry.addonsInfo.json';

const routes: RouteConfig = [
  route('ok', 'okroute.tsx', { id: 'ok' }),
  route('reset-fetcher', 'reset-fetcher.tsx', { id: 'reset-fetcher' }),
  ...getAddonRoutesConfig(
    (addonsRoutes as ReactRouterRouteEntry[]) || [],
    addonsInfo,
  ),
];

export default routes;
