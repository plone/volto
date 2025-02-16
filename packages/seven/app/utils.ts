import config from '@plone/registry';

/**
 * Flatten to app server URL - Given a URL if it starts with the API server URL
 * this method flattens it (removes) the server part
 * TODO: Update it when implementing non-root based app location (on a
 * directory other than /, eg. /myapp)
 * @method flattenToAppURL
 */
export function flattenToAppURL(url: string | undefined): string | undefined {
  const { settings } = config;

  const result =
    url &&
    url.replace(settings.apiPath, '').replace('http://localhost:3000', '');
  return result;
}
