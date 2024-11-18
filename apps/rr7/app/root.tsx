import { useState } from 'react';
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
} from 'react-router';
import type { LinksFunction } from 'react-router';

import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PloneClient from '@plone/client';
import { PloneProvider } from '@plone/providers';
import { flattenToAppURL } from './utils';
import config from '@plone/registry';
import install from './config';

import '@plone/theming/styles/main.css';
import '@plone/slots/main.css';

install();

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

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
      <ReactQueryDevtools initialIsOpen={false} />
    </PloneProvider>
  );
}
