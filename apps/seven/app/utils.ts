import config from '@plone/registry';
import { type Content } from '@plone/types';

/**
 * The definitive flattenToAppURL function
 * Flattens all the URLs in the response to the current app URL
 * This could be a potential use case for the upcoming RR7 middleware
 */
export function flattenToAppURL(data: Content) {
  // Convert data to string to perform replacements
  let stringData = JSON.stringify(data);

  // Replace all occurrences of backend URLs
  stringData = stringData.replaceAll(`${config.settings.apiPath}/`, '/');
  stringData = stringData.replaceAll(config.settings.apiPath, '/');

  // Parse back to object
  return JSON.parse(stringData) as Content;
}
