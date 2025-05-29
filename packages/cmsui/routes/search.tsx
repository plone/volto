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
  const query = Object.fromEntries(new URL(request.url).searchParams.entries());

  const results = flattenToAppURL(
    (
      await cli.search({
        query: {
          path: {
            query: path,
            // TODO get depth from query
            // depth: query.path?.depth,
          },
          ...query,
        },
      })
    ).data,
    config.settings.apiPath,
  );

  return data(results, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
