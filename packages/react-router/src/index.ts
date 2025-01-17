import { route, index, layout, prefix } from '@react-router/dev/routes';
import type { RouteConfig } from '@react-router/dev/routes';

export type ReactRouterRouteEntry = {
  type: 'route' | 'index' | 'layout' | 'prefix';
  path: string;
  file: string;
  options?: {
    id?: string;
    index?: boolean;
    caseSensitive?: boolean;
  };
  children?: ReactRouterRouteEntry[];
};

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
              getAddonRoutesConfig(routeConfig.children),
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
              getAddonRoutesConfig(routeConfig.children),
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
    return resultRoutesConfig;
  }
}
