import config from '@plone/volto/registry';
import { matchPath } from 'react-router';

const blacklistRoutes = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    return next(action);
  }

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      let { pathname } = action.payload.location;
      const { externalRoutes = [] } = config.settings;

      const route = externalRoutes.find((route) =>
        matchPath(pathname, route.match),
      );

      let actionToSend = action;
      if (pathname.startsWith('/++api++')) {
        actionToSend.payload.location.pathname = actionToSend.payload.location.pathname.substring(
          8,
        );
        // To handle the `window.location.replace`
        pathname = actionToSend.payload.location.pathname;
        if (window.history) {
          window.history.replaceState(window.history.state, '', pathname);
        }
      }

      if (!route) {
        return next(actionToSend);
      } else {
        window.location.replace(
          route.url ? route.url(actionToSend.payload) : pathname,
        );
      }
      break;
    default:
      return next(action);
  }
};

export default blacklistRoutes;
