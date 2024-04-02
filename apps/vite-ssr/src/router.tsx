import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  hydrate,
} from '@tanstack/react-query';
import PloneClient from '@plone/client';
import { createRouter as createReactRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import { PloneClientProvider } from '@plone/client/provider';
import { FlattenToAppURLProvider } from '@plone/components';
import { flattenToAppURL } from './utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  },
});

const ploneClient = PloneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
});

export function createRouter() {
  return createReactRouter({
    routeTree,
    context: {
      head: '',
      queryClient,
      ploneClient,
    },
    defaultPreload: 'intent',
    dehydrate: () => {
      return {
        queryClientState: dehydrate(queryClient),
      };
    },
    hydrate: (dehydrated) => {
      hydrate(queryClient, dehydrated.queryClientState);
    },
    Wrap: ({ children }: { children: any }) => {
      return (
        <PloneClientProvider client={ploneClient}>
          <QueryClientProvider client={queryClient}>
            <FlattenToAppURLProvider flattenToAppURL={flattenToAppURL}>
              {children}
            </FlattenToAppURLProvider>
          </QueryClientProvider>
        </PloneClientProvider>
      );
    },
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
