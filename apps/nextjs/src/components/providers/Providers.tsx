'use client';

import React from 'react';
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from 'next/navigation';
import { isServer, QueryClient } from '@tanstack/react-query';
import { PloneProvider } from '@plone/providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { client } from '@/helpers/client';
import { flattenToAppURL } from '@/helpers/url';

// Custom hook to unify the location object between NextJS and Plone
function useLocation() {
  const pathname = usePathname();
  const search = useSearchParams();

  return {
    pathname,
    search,
    searchStr: '',
    hash: (typeof window !== 'undefined' && window.location.hash) || '',
    href: (typeof window !== 'undefined' && window.location.href) || '',
  };
}

// Fix for infinite useSuspenseQuery loop
// https://github.com/TanStack/query/issues/6116
// https://tanstack.com/query/latest/docs/framework/react/guides/suspense
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: React.PropsWithChildren) {
  const [ploneClient] = React.useState(() => client);
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  const router = useRouter();

  return (
    <PloneProvider
      ploneClient={ploneClient}
      queryClient={queryClient}
      // NextJS doesn't have a useLocation hook, so we need to unify this
      // in a custom hook
      useLocation={useLocation}
      navigate={(to) => {
        router.push(to);
      }}
      useParams={useParams}
      useHref={(to) => flattenToAppURL(to)}
      flattenToAppURL={flattenToAppURL}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PloneProvider>
  );
}

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}
