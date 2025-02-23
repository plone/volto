import { RouteConfigEntry } from '@react-router/dev/routes';
import { ReactRouterRouteEntry } from '@plone/types';

declare function getAddonRoutesConfig(routesConfig: Array<ReactRouterRouteEntry>, addonsInfo: Array<any>): Array<RouteConfigEntry>;

export { getAddonRoutesConfig };
