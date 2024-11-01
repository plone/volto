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
// import { Breadcrumbs, RenderBlocks } from '@plone/components';
// import config from '@plone/registry';
import { ploneClient } from '../client';
import App from '@plone/slots/components/App';

export const meta: MetaFunction = () => {
  return [
    { title: 'Plone on Remix' },
    { name: 'description', content: 'Welcome to Plone on Remix!' },
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

function Page() {
  const { getContentQuery } = usePloneClient();
  const pathname = useLocation().pathname;
  const { data } = useQuery(getContentQuery({ path: pathname, expand }));

  if (!data) return null;
  return (
    <>
      <App content={data} location={{ pathname: '/' }} />
    </>
  );
}

export default function Index() {
  const { dehydratedState } = useLoaderData<typeof loader>();

  return (
    <HydrationBoundary state={dehydratedState}>
      <Page />
    </HydrationBoundary>
  );
}
