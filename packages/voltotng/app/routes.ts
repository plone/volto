import type { RouteConfig } from '@react-router/dev/routes';
import { index, route } from '@react-router/dev/routes';
import { getAddonRoutesConfig } from '@plone/react-router';
import config from '@plone/registry';
import applyAddonConfiguration, { addonsInfo } from '../.registry.loader';

applyAddonConfiguration(config);

const routes: RouteConfig = [
  index('content.tsx', { id: 'index' }),
  route('ok', 'okroute.tsx', { id: 'ok' }),
  route('*', 'content.tsx', { id: 'content' }),
  ...getAddonRoutesConfig(config.routes || [], addonsInfo),
];

export default routes;
