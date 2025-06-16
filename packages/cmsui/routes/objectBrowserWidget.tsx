import { data, type LoaderFunctionArgs } from 'react-router';
import type PloneClient from '@plone/client';
import { flattenToAppURL } from '@plone/helpers';
import { getAuthFromRequest } from '@plone/react-router';
import config from '@plone/registry';

// NOTE: cannot import and reuse loaders, somewhere it tries to load js process which is undefined
export async function loader({ params, request, context }: LoaderFunctionArgs) {
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
  // Has to be used?
  // const strippedRequest = new Request(request.url.replace(/\?.*$/, ''), {
  //   headers: request.headers,
  // });
  // Call the breadcrumbs endpoint
  const { data: breadcrumbs } = await cli.getBreadcrumbs({
    path,
  });

  return data(flattenToAppURL({ results, breadcrumbs }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
