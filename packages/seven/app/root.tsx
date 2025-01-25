import { useState } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useHref,
  useLocation,
  useNavigate as useRRNavigate,
  useParams,
  useLoaderData,
  useRouteLoaderData,
} from 'react-router';
import type { Route } from './+types/root';

import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PloneClient from '@plone/client';
import { PloneProvider } from '@plone/providers';
import { flattenToAppURL } from './utils';
import config from '@plone/registry';
import install from './config';
import installSSR from './config.server';

install();

import themingMain from '@plone/theming/styles/main.css?url';
import slotsMain from '@plone/slots/main.css?url';

function useNavigate() {
  const navigate = useRRNavigate();
  return (to: string) => navigate(flattenToAppURL(to) || '');
}

function useHrefLocal(to: string) {
  return useHref(flattenToAppURL(to) || '');
}

export const meta: Route.MetaFunction = () => [
  { name: 'generator', content: 'Plone 7 - https://plone.org' },
];

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.png',
    type: 'image/png',
    sizes: 'any',
  },
  {
    rel: 'icon',
    href: '/icon.svg',
    type: 'image/svg+xml',
  },
  { rel: 'stylesheet', href: themingMain },
  { rel: 'stylesheet', href: slotsMain },
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

export async function loader() {
  const ssrConfig = installSSR();

  return {
    env: {
      PLONE_API_PATH: ssrConfig.settings.apiPath,
      PLONE_INTERNAL_API_PATH: ssrConfig.settings.internalApiPath,
    },
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const indexLoaderData = useRouteLoaderData('index');
  const contentLoaderData = useRouteLoaderData('content');
  const contentData = indexLoaderData || contentLoaderData;

  return (
    <html lang={contentData?.language?.token || 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <Meta />
        <Links />
      </head>
      <body>
        <div role="navigation" aria-label="Toolbar" id="toolbar" />
        <div id="main">{children}</div>
        <div role="complementary" aria-label="Sidebar" id="sidebar" />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(data.env)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

declare global {
  interface Window {
    env: {
      PLONE_API_PATH: string;
      PLONE_INTERNAL_API_PATH: string;
    };
  }
}

export default function App() {
  if (!import.meta.env.SSR) {
    config.settings.apiPath = window.env.PLONE_API_PATH;
    config.settings.internalApiPath = window.env.PLONE_INTERNAL_API_PATH;
  }

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

  const navigate = useNavigate();

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
