import {
  data,
  RouterContextProvider,
  type LoaderFunctionArgs,
} from 'react-router';
import { flattenToAppURL } from '@plone/helpers';
import { ploneClientContext } from 'seven/app/middleware.server';

export async function loader({
  params,
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  const cli = context.get(ploneClientContext);

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
