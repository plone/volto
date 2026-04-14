import {
  data,
  RouterContextProvider,
  type LoaderFunctionArgs,
} from 'react-router';
import { ploneClientContext } from 'seven/app/middleware.server';
import { flattenToAppURL } from '@plone/helpers';

export async function loader({
  params,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  const cli = context.get(ploneClientContext);

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
