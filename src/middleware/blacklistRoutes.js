import config from '@plone/volto/registry';
import { matchPath } from 'react-router';

const blacklistRoutes =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return next(action);
    }

    switch (action.type) {
      case '@@router/LOCATION_CHANGE':
        const { pathname } = action.payload.location;
        const { externalRoutes = [] } = config.settings;

        const route = externalRoutes.find((route) =>
          matchPath(pathname, route.match),
        );

        if (!route) {
          return next(action);
        } else {
          window.location.replace(
            route.url ? route.url(action.payload) : pathname,
          );
        }
        break;
      default:
        return next(action);
    }
  };

export default blacklistRoutes;
