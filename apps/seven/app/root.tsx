import { PropsWithChildren } from 'react';
import { data, isRouteErrorResponse } from 'react-router';
import { useChangeLanguage } from 'remix-i18next/react';
import i18next from './i18next.server';
import type { Route } from './+types/root';
import { flattenToAppURL } from '@plone/helpers';
import type PloneClient from '@plone/client';
import config from '@plone/registry';
import {
  getAPIResourceWithAuth,
  installServerMiddleware,
  otherResources,
} from './middleware.server';

export const unstable_middleware = [
  installServerMiddleware,
  otherResources,
  getAPIResourceWithAuth,
];

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale = await i18next.getLocale(request);

  const expand = ['navroot', 'breadcrumbs', 'navigation', 'actions'];

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  const path = `/${params['*'] || ''}`;

  try {
    const [content, site] = await Promise.all([
      cli.getContent({ path, expand }),
      cli.getSite(),
    ]);
    return {
      content: flattenToAppURL(content.data),
      site: flattenToAppURL(site.data),
      locale,
    };
  } catch (error: any) {
    throw data('Content Not Found', {
      status: typeof error.status === 'number' ? error.status : 500,
    });
  }
}

export type RootLoader = typeof loader;

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common',
};

export function Layout({
  children,
  loaderData,
}: PropsWithChildren<Route.ComponentProps>) {
  // loaderData can be undefined in case of an error
  const locale = loaderData?.locale || 'en';

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return children;
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <main className="container mx-auto p-4 pt-16">
          <h1>{message}</h1>
          <p>{details}</p>
          {stack && (
            <pre className="w-full overflow-x-auto p-4">
              <code>{stack}</code>
            </pre>
          )}
        </main>
      </body>
    </html>
  );
}
