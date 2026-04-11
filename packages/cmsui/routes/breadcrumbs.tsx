import { data, type LoaderFunctionArgs } from 'react-router';
import { flattenToAppURL } from '@plone/helpers';
import { getAuthFromRequest } from '@plone/react-router';
import config from '@plone/registry';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const token = await getAuthFromRequest(request);

  const PloneClient = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method();

  const cli = PloneClient.initialize({
    apiPath: config.settings.apiPath,
    token,
  });

  const path = `/${params['*'] || ''}`;

  // Call the breadcrumbs endpoint
  const { data: breadcrumbs } = await cli.getBreadcrumbs({
    path,
  });

  return data(flattenToAppURL(breadcrumbs), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
