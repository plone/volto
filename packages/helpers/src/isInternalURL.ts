import config from '@plone/registry';
import { matchPath } from 'react-router';
import { flattenToAppURL } from './flattenToAppURL';

/** Check if the URL is internal */
export function isInternalURL(url: string): boolean {
  const { settings } = config;

  const isMatch = (config.settings.externalRoutes ?? []).find((route) => {
    const pathname = flattenToAppURL(url);

    if (typeof route === 'object') {
      return matchPath(route.match as string, pathname);
    }

    return matchPath(route, pathname);
  });

  const isExcluded = isMatch && Object.keys(isMatch)?.length > 0;

  const internalURL =
    !!url &&
    (url.indexOf(settings.publicURL) !== -1 ||
      (settings.internalApiPath &&
        url.indexOf(settings.internalApiPath) !== -1) ||
      url.indexOf(settings.apiPath) !== -1 ||
      url.charAt(0) === '/' ||
      url.charAt(0) === '.' ||
      url.startsWith('#'));

  if (internalURL && isExcluded) {
    return false;
  }

  return internalURL;
}
