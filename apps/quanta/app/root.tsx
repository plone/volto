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
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next/react';
import i18next from '~/i18next.server';
import type { Route } from './+types/root';
import contentLoader from './loaders/content';

import { AppRouterProvider } from '@plone/providers';
import { flattenToAppURL } from './utils';

// eslint-disable-next-line import/no-unresolved
import stylesheet from './app.css?url';

function useNavigate() {
  const navigate = useRRNavigate();
  return (to: string) => navigate(to);
}

export const meta: Route.MetaFunction = ({ data }) => [
  { title: data.content?.title },
  { name: 'description', content: data.content?.description },
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
  const locale = await i18next.getLocale(request);

  return {
    content: await contentLoader({ params, request, context }),
    locale,
  };
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common',
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { content, locale } = useLoaderData<typeof loader>();

  const { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={content?.language?.token || locale || 'en'} dir={i18n.dir()}>
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
      useHref={useHref}
      navigate={navigate}
      flattenToAppURL={flattenToAppURL}
    >
      <Outlet />
    </AppRouterProvider>
  );
}
