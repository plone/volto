import { data, type LoaderFunctionArgs } from 'react-router';
import type PloneClient from '@plone/client';
import { flattenToAppURL } from '@plone/helpers';
import { getAuthFromRequest } from '@plone/react-router';
import config from '@plone/registry';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const token = await getAuthFromRequest(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  const path = `/${params['*'] || ''}`;

  // Call the breadcrumbs endpoint
  const { data: breadcrumbs } = await cli.getBreadcrumbs({
    path,
  });

  return data(flattenToAppURL(breadcrumbs, config.settings.apiPath), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
