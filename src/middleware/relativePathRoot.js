/**
 * A middleware that prefixes all paths with the relative root path.
 * To use the relative paths, set the RAZZLE_PREFIX_PATH env var.
 */

import config from '@plone/volto/registry';

const relativePathRoot = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    return next(action);
  }

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      const { pathname } = action.payload.location;
      const { prefixPath } = config.settings;
      console.log('rel', prefixPath);
      if (!prefixPath) break;

      if (!pathname.startsWith(`/${prefixPath}`)) {
        action.payload.location.pathname = `/${prefixPath}${pathname}`;
        console.log(
          'relativePath',
          pathname,
          prefixPath,
          action.payload.location.pathname,
        );
      }
      return next(action);
    default:
      return next(action);
  }
};

export default relativePathRoot;
