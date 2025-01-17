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
  for (const routeConfig of routesConfig) {
    switch (routeConfig.type) {
      case 'route':
        if (routeConfig.options) {
          route(routeConfig.path, routeConfig.file, routeConfig.options);
        }
        if (routeConfig.children) {
          route(
            routeConfig.path,
            routeConfig.file,
            routeConfig.options || {},
            routeConfig.children,
          );
        }
        break;

      case 'index':
        index(routeConfig.file, routeConfig.options);
        break;

      case 'layout':
        if (routeConfig.options) {
          layout(routeConfig.file, routeConfig.options);
        }
        if (routeConfig.children) {
          layout(
            routeConfig.file,
            routeConfig.options || {},
            routeConfig.children,
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
}
