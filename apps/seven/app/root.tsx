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
} from 'react-router';
import type { Route } from './+types/root';
import contentLoader from './loaders/content';

import { AppRouterProvider } from '@plone/providers';
import { flattenToAppURL } from './utils';
import install from './config';
import installServer from './config.server';

install();

// eslint-disable-next-line import/no-unresolved
import stylesheet from '../addons.styles.css?url';

function useNavigate() {
  const navigate = useRRNavigate();
  return (to: string) => navigate(flattenToAppURL(to) || '');
}

function useHrefLocal(to: string) {
  return useHref(flattenToAppURL(to) || '');
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: data?.title },
  { name: 'description', content: data?.description },
  { name: 'generator', content: 'Plone 7 - https://plone.org' },
];

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.ico',
    type: 'image/x-icon',
    sizes: 'any',
  },
  {
    rel: 'icon',
    href: '/icon.svg',
    type: 'image/svg+xml',
  },
  { rel: 'stylesheet', href: stylesheet },
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

export async function loader({ params, request, context }: Route.LoaderArgs) {
  installServer();

  return await contentLoader({ params, request, context });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang={data?.language?.token || 'en'}>
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

export default function App() {
  const navigate = useNavigate();

  return (
    <AppRouterProvider
      useLocation={useLocation}
      useParams={useParams}
      useHref={useHrefLocal}
      navigate={navigate}
      flattenToAppURL={flattenToAppURL}
    >
      <Outlet />
    </AppRouterProvider>
  );
}
