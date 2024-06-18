import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
  useQuery,
} from '@tanstack/react-query';
import { flattenToAppURL } from '../utils';
import { useLoaderData, useLocation } from '@remix-run/react';
import { usePloneClient } from '@plone/providers';
import { Breadcrumbs, RenderBlocks } from '@plone/components';
import config from '@plone/registry';
import { ploneClient } from '../client';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

const expand = ['breadcrumbs', 'navigation'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });

  const { getContentQuery } = ploneClient;

  await queryClient.prefetchQuery(
    getContentQuery({ path: flattenToAppURL(request.url), expand }),
  );

  return json({ dehydratedState: dehydrate(queryClient) });
};

export default function Index() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  const { getContentQuery } = usePloneClient();
  const pathname = useLocation().pathname;
  const { data } = useQuery(getContentQuery({ path: pathname, expand }));

  if (!data) return null;

  return (
    <HydrationBoundary state={dehydratedState}>
      <Breadcrumbs
        items={data['@components'].breadcrumbs.items || []}
        root={data['@components'].breadcrumbs.root}
        includeRoot
      />
      <RenderBlocks
        content={data}
        blocksConfig={config.blocks.blocksConfig}
        pathname="/"
      />
    </HydrationBoundary>
  );
}
