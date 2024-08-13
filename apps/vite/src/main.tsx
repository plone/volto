import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PloneClient from '@plone/client';
import { PloneClientProvider } from '@plone/providers';
import { FlattenToAppURLProvider } from '@plone/providers';
import { flattenToAppURL } from './utils';

import './config';

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

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    ploneClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <PloneClientProvider client={ploneClient}>
      <QueryClientProvider client={queryClient}>
        <FlattenToAppURLProvider flattenToAppURL={flattenToAppURL}>
          <RouterProvider router={router} />
        </FlattenToAppURLProvider>
      </QueryClientProvider>
    </PloneClientProvider>,
  );
}
