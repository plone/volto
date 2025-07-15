import config from '@plone/registry';

/**
 * The definitive flattenToAppURL function
 * Flattens all the URLs in the response to the current app URL (or internalApiPath if set).
 */
export function bulkFlattenToAppURL<T>(data: T) {
  // Convert data to string to perform replacements
  let stringData = JSON.stringify(data);

  // Replace all occurrences of backend URLs
  stringData = stringData.replaceAll(`${config.settings.apiPath}/`, '/');
  stringData = stringData.replaceAll(config.settings.apiPath, '/');
  if (config.settings.internalApiPath) {
    stringData = stringData.replaceAll(
      `${config.settings.internalApiPath}/`,
      '/',
    );
    stringData = stringData.replaceAll(config.settings.internalApiPath, '/');
  }

  // Parse back to object
  return JSON.parse(stringData) as T;
}
