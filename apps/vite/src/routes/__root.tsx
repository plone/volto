import * as React from 'react';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { RouterProvider } from 'react-aria-components';
import PloneClient from '@plone/client';

import '@plone/components/dist/basic.css';
import '../main.css';
import { AppRouterProvider } from '@plone/providers';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  ploneClient: PloneClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

  return (
    <AppRouterProvider
      navigate={(path: string) => router.navigate({ to: path })}
      useLocation={useLocation}
    >
      <RouterProvider
        navigate={(path: string) => router.navigate({ to: path })}
      >
        <Outlet />
        <ReactQueryDevtools buttonPosition="top-right" />
        <TanStackRouterDevtools position="bottom-right" />
      </RouterProvider>
    </AppRouterProvider>
  );
}
