import type { Route } from '../+types/root';
import { data } from 'react-router';
import PloneClient from '@plone/client';
import config from '@plone/registry';
import type { Content } from '@plone/types';

const expand = ['navroot', 'breadcrumbs', 'navigation'];

/**
 * The definitive flattenToAppURL function
 * Flattens all the URLs in the response to the current app URL
 * This could be a potential use case for the upcoming RR7 middleware
 */
function flattenToAppURL(data: Content, request: Request) {
  // Convert data to string to perform replacements
  let stringData = JSON.stringify(data);

  // Replace all occurrences of backend URLs
  stringData = stringData.replaceAll(`${config.settings.apiPath}/`, '/');
  stringData = stringData.replaceAll(config.settings.apiPath, '/');

  // Parse back to object
  return JSON.parse(stringData);
}

export default async function loader({ params, request }: Route.LoaderArgs) {
  const ploneClient = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  const path = `/${params['*'] || ''}`;

  if (
    !(
      /^https?:\/\//.test(path) ||
      /^favicon.ico\/\//.test(path) ||
      /expand/.test(path) ||
      /\/@@images\//.test(path) ||
      /\/@@download\//.test(path) ||
      /^\/assets/.test(path) ||
      /\.(css|css\.map)$/.test(path)
    )
  ) {
    try {
      const { data } = await ploneClient.getContent({ path, expand });
      return flattenToAppURL(data, request);
    } catch (error) {
      console.log(error);
      throw data('Content Not Found', { status: 404 });
    }
  } else {
    console.log('matched path not fetched', path);
    throw data('Content Not Found', { status: 404 });
  }
}
