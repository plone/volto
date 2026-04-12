import {
  data,
  RouterContextProvider,
  type LoaderFunctionArgs,
} from 'react-router';
import { ploneClientContext } from 'seven/app/middleware.server';
import { flattenToAppURL } from '@plone/helpers';

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
  // const items = response.items;
  // const firstLevelIds = items
  //   .filter((i) => i['@id'].split('/').length > 1)
  //   .map((i) => i['@id']);

  // const results = firstLevelIds.reduce((acc, curr) => {
  //   const child = items.some((item) => item['@id'] === curr);

  //   return [acc, ...;
  // }, []);
  // Has to be used?
  // const strippedRequest = new Request(request.url.replace(/\?.*$/, ''), {
  //   headers: request.headers,
  // });

  // TODO replace with reading from the context expander
  // const content = context.get(ploneContentContext),
  // content.data['@components'].breadcrumbs....
  const { data: breadcrumbs } = await cli.getBreadcrumbs({
    path,
  });

  return data(flattenToAppURL({ results, breadcrumbs }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
