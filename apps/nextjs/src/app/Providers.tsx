'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PloneClientProvider } from '@plone/providers';
import PloneClient from '@plone/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-aria-components';
import { FlattenToAppURLProvider } from '@plone/components';
import { flattenToAppURL } from './utils';
import config from './config';

const Providers: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  // Creating the clients at the file root level makes the cache shared
  // between all requests and means _all_ data gets passed to _all_ users.
  // Besides being bad for performance, this also leaks any sensitive data.
  // We use this pattern to ensure that every client gets its own clients
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  const [ploneClient] = React.useState(() =>
    PloneClient.initialize({
      apiPath: config.settings.apiPath,
    }),
  );

  const router = useRouter();

  return (
    <RouterProvider navigate={router.push}>
      <PloneClientProvider client={ploneClient}>
        <QueryClientProvider client={queryClient}>
          <FlattenToAppURLProvider flattenToAppURL={flattenToAppURL}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </FlattenToAppURLProvider>
        </QueryClientProvider>
      </PloneClientProvider>
    </RouterProvider>
  );
};

export default Providers;
