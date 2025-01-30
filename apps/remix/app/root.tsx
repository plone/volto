import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useHref,
  useLocation,
  useNavigate,
  useParams,
} from '@remix-run/react';
import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import PloneClient from '@plone/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@plone/components/dist/basic.css';
import '@plone/slots/main.css';
import { flattenToAppURL } from './utils';
import { PloneProvider } from '@plone/providers';

import config from '@plone/registry';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  const [queryClient] = useState(
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

  const [ploneClient] = useState(() =>
    PloneClient.initialize({
      apiPath: config.settings.apiPath,
    }),
  );

  const RRNavigate = useNavigate();

  const navigate = (to: string) => {
    return RRNavigate(flattenToAppURL(to));
  };

  function useHrefLocal(to: string) {
    return useHref(flattenToAppURL(to));
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PloneProvider
          ploneClient={ploneClient}
          queryClient={queryClient}
          useLocation={useLocation}
          useParams={useParams}
          useHref={useHrefLocal}
          navigate={navigate}
          flattenToAppURL={flattenToAppURL}
        >
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <ReactQueryDevtools initialIsOpen={false} />
        </PloneProvider>
      </body>
    </html>
  );
}
