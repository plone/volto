'use client';
import React from 'react';
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from 'next/navigation';
import { QueryClient } from '@tanstack/react-query';
import { PloneProvider } from '@plone/providers';
import PloneClient from '@plone/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { flattenToAppURL } from './utils';
import config from './config';

// Custom hook to unify the location object between NextJS and Plone
function useLocation() {
  let pathname = usePathname();
  let search = useSearchParams();

  return {
    pathname,
    search,
    searchStr: '',
    hash: (typeof window !== 'undefined' && window.location.hash) || '',
    href: (typeof window !== 'undefined' && window.location.href) || '',
  };
}

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

  let router = useRouter();

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
};

export default Providers;
