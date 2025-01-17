import { route, index, layout, prefix } from '@react-router/dev/routes';
import type { RouteConfig, RouteConfigEntry } from '@react-router/dev/routes';
import type { ReactRouterRouteEntry } from '@plone/types';

export function getAddonRoutesConfig(
  routesConfig: Array<ReactRouterRouteEntry>,
): RouteConfig {
  let resultRoutesConfig: RouteConfig = [];
  for (const routeConfig of routesConfig) {
    switch (routeConfig.type) {
      case 'route':
        if (routeConfig.options) {
          resultRoutesConfig.push(
            route(routeConfig.path, routeConfig.file, routeConfig.options),
          );
        } else if (routeConfig.children) {
          resultRoutesConfig.push(
            route(
              routeConfig.path,
              routeConfig.file,
              routeConfig.options || {},
              getAddonRoutesConfig(
                routeConfig.children,
              ) as Array<RouteConfigEntry>,
            ),
          );
        } else {
          resultRoutesConfig.push(route(routeConfig.path, routeConfig.file));
        }
        break;

      case 'index':
        resultRoutesConfig.push(index(routeConfig.file, routeConfig.options));
        break;

      case 'layout':
        if (routeConfig.options) {
          resultRoutesConfig.push(
            layout(routeConfig.file, routeConfig.options),
          );
        }
        if (routeConfig.children) {
          resultRoutesConfig.push(
            layout(
              routeConfig.file,
              routeConfig.options || {},
              getAddonRoutesConfig(
                routeConfig.children,
              ) as Array<RouteConfigEntry>,
            ),
          );
        }
        break;

      case 'prefix':
        console.log('prefix not implemented yet');
        break;
      default:
        break;
    }
  }
  return resultRoutesConfig;
}
