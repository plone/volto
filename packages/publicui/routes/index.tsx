import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  type LinksFunction,
  type MetaFunction,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import type { RootLoader } from 'quanta/app/root';
import type { Route } from 'quanta/.react-router/types/app/+types/root';

// eslint-disable-next-line import/no-unresolved
// import stylesheet from './app.css?url';

export const meta: MetaFunction<unknown, { root: RootLoader }> = ({
  matches,
}) => {
  const content = matches.find((match) => match.id === 'root')?.data?.content;
  if (!content) {
    return [];
  }

  return [
    { title: content.title },
    { name: 'description', content: content.description },
    { name: 'generator', content: 'Plone 7 - https://plone.org' },
  ];
};

export const links: LinksFunction = () => [
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
  // { rel: 'stylesheet', href: stylesheet },
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

export default function Index() {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const { i18n } = useTranslation();

  if (!rootData) {
    return null;
  }
  const { content, locale } = rootData;

  return (
    <html lang={content.language?.token || locale || 'en'} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <Meta />
        <Links />
      </head>
      <body>
        <div role="navigation" aria-label="Toolbar" id="toolbar" />
        <div id="main">
          <Outlet />
        </div>
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
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
