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
  const pathQuery = {
    query: query['path.query'] || path,
    depth: Number(query['path.depth']) || undefined,
  };

  delete query['path.depth'];
  delete query['path.query'];

  const { data: results } = await cli.search({
    query: {
      path: pathQuery,
      ...query,
      SearchableText: query.SearchableText
        ? `${query.SearchableText}*`
        : undefined,
    },
  });

  return data(flattenToAppURL(results), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
