/**
 * A middleware that prefixes all paths with the relative root path.
 * To use the relative paths, set the RAZZLE_PREFIX_PATH env var.
 *
 * This middleware is meant to catch route destinations that are hardcoded,
 * for example the Logo hardcodes its destination as "/".
 */

import config from '@plone/volto/registry';

const prefixPathRoot = (history) => ({ dispatch, getState }) => (next) => (
  action,
) => {
  if (typeof action === 'function') {
    return next(action);
  }

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      const {
        location: { pathname },
        isFirstRendering,
      } = action.payload;
      const { prefixPath } = config.settings;
      let newPathname = pathname;
      if (!prefixPath) {
        break;
      }

      if (action.payload.action === 'POP' && !isFirstRendering) {
        const portion = pathname.split('/');
        const spreadPath = portion.slice(0, portion.length - 1);
        newPathname = spreadPath.join('/') ?? '/';
        action.payload.location.pathname = newPathname;
        history.push(newPathname);
      }
      if (!newPathname.startsWith(prefixPath)) {
        const newPrefixedPath = `${prefixPath}${
          newPathname === '/' ? '' : newPathname
        }`;
        action.payload.location.pathname = newPrefixedPath;
        history.push(newPrefixedPath);
      }
      return next(action);

    default:
      return next(action);
  }

  return next(action);
};

export default prefixPathRoot;
