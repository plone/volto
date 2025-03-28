import { route, index, layout, prefix } from '@react-router/dev/routes';
import type { RouteConfig, RouteConfigEntry } from '@react-router/dev/routes';
import type { ReactRouterRouteEntry } from '@plone/types';
import path from 'node:path';

export function getAddonRoutesConfig(
  routesConfig: Array<ReactRouterRouteEntry>,
  addonsInfo: Array<any>,
): Array<RouteConfigEntry> {
  const resultRoutesConfig: RouteConfig = [];

  for (const routeConfig of routesConfig) {
    if (routeConfig.type !== 'prefix') {
      const containsAddonModule = addonsInfo.find((addon) =>
        routeConfig.file.includes(addon.name),
      );
      if (containsAddonModule) {
        routeConfig.file = path.join(
          containsAddonModule.modulePath,
          routeConfig.file.replace(containsAddonModule.name, ''),
        );
      }
    }
    switch (routeConfig.type) {
      case 'route': {
        const children = routeConfig.children
          ? (getAddonRoutesConfig(
              routeConfig.children,
              addonsInfo,
            ) as Array<RouteConfigEntry>)
          : undefined;
        resultRoutesConfig.push(
          route(
            routeConfig.path,
            routeConfig.file,
            routeConfig.options || {},
            children,
          ),
        );
        break;
      }
      case 'index':
        resultRoutesConfig.push(index(routeConfig.file, routeConfig.options));
        break;

      case 'layout': {
        const children = routeConfig.children
          ? (getAddonRoutesConfig(
              routeConfig.children,
              addonsInfo,
            ) as Array<RouteConfigEntry>)
          : undefined;
        resultRoutesConfig.push(
          layout(routeConfig.file, routeConfig.options || {}, children),
        );
        break;
      }
      case 'prefix':
        resultRoutesConfig.push(
          ...prefix(
            routeConfig.path,
            getAddonRoutesConfig(routeConfig.children, addonsInfo),
          ),
        );
        break;
      default:
        break;
    }
  }
  return resultRoutesConfig;
}
