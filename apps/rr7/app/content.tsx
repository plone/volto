import type { LoaderArgs } from './routes/+types.home';
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { flattenToAppURL } from './utils';
import { useLoaderData, useLocation } from 'react-router';
import { usePloneClient } from '@plone/providers';
import { ploneClient } from './client';
import App from '@plone/slots/components/App';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Plone on React Router 7' },
    { name: 'description', content: 'Welcome to Plone!' },
  ];
};

const expand = ['navroot', 'breadcrumbs', 'navigation'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({ params, request }: LoaderArgs) {
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

  return { dehydratedState: dehydrate(queryClient) };
}

function Page() {
  const { getContentQuery } = usePloneClient();
  const pathname = useLocation().pathname;
  const { data } = useQuery(getContentQuery({ path: pathname, expand }));

  if (!data) return 'Loading...';
  return <App content={data} location={{ pathname: '/' }} />;
}

export default function Content() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  const queryClient = useQueryClient();

  return (
    <HydrationBoundary state={dehydratedState} queryClient={queryClient}>
      <Page />
    </HydrationBoundary>
  );
}
