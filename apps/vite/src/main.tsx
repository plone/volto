import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createRouter,
  useLocation,
  useParams,
} from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryClient } from '@tanstack/react-query';

import PloneClient from '@plone/client';
import { PloneProvider } from '@plone/providers';
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
    <PloneProvider
      ploneClient={ploneClient}
      queryClient={queryClient}
      useLocation={useLocation}
      navigate={(path: string) =>
        router.navigate({ to: flattenToAppURL(path) })
      }
      // TODO: Investigate why this fails in @tanstack/router :/
      useHref={(to) => {
        return flattenToAppURL(to);
      }}
      useParams={useParams}
      flattenToAppURL={flattenToAppURL}
    >
      <RouterProvider router={router} />
    </PloneProvider>,
  );
}
