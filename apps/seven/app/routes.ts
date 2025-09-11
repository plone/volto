import type { RouteConfig } from '@react-router/dev/routes';
import { route } from '@react-router/dev/routes';
import { getAddonRoutesConfig } from '@plone/react-router';
import config from '@plone/registry';
// eslint-disable-next-line import/no-unresolved
import applyAddonConfiguration, { addonsInfo } from '../registry.loader';

applyAddonConfiguration(config);

const routes: RouteConfig = [
  route('ok', 'okroute.tsx', { id: 'ok' }),
  route('reset-fetcher', 'reset-fetcher.tsx', { id: 'ok' }),
  ...getAddonRoutesConfig(config.routes || [], addonsInfo),
];

export default routes;
