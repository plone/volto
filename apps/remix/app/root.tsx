import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PloneClientProvider } from '@plone/providers';
import PloneClient from '@plone/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
      apiPath: 'http://localhost:8080/Plone',
    }),
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PloneClientProvider client={ploneClient}>
          <QueryClientProvider client={queryClient}>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PloneClientProvider>
      </body>
    </html>
  );
}
