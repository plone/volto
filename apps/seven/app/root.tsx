import { PropsWithChildren } from 'react';
import { data, isRouteErrorResponse } from 'react-router';
import { useChangeLanguage } from 'remix-i18next/react';
import i18next from './i18next.server';
import type { Route } from './+types/root';
import { flattenToAppURL } from './utils';
import type PloneClient from '@plone/client';
import { getAuthFromRequest } from '@plone/react-router';
import config from '@plone/registry';
import installServer from './config.server';

// eslint-disable-next-line import/no-unresolved
import stylesheet from '../addons.styles.css?url';

export const installServerMiddleware: Route.unstable_MiddlewareFunction =
  async ({ request, context }, next) => {
    installServer();
    // const locale = await i18next.getLocale(request);
    // context.setData({ locale });

    // This is needed in v7.4.0 even if it should not be mandatory
    // Relevant issue: https://github.com/remix-run/react-router/issues/13274
    return await next();
  };

export const otherResources: Route.unstable_MiddlewareFunction = async (
  { request, params, context },
  next,
) => {
  const path = `/${params['*'] || ''}`;

  if (
    /^https?:\/\//.test(path) ||
    /^favicon.ico\/\//.test(path) ||
    /expand/.test(path) ||
    /^\/assets/.test(path) ||
    /\.(css|css\.map)$/.test(path)
  ) {
    // eslint-disable-next-line no-console
    console.log('matched path not fetched', path);
    throw data('Content Not Found', { status: 404 });
  }

  // This is needed in v7.4.0 even if it should not be mandatory
  // Relevant issue: https://github.com/remix-run/react-router/issues/13274
  return await next();
};

export const getAPIResourceWithAuth: Route.unstable_MiddlewareFunction = async (
  { request, params },
  next,
) => {
  const path = `/${params['*'] || ''}`;

  if (
    /\/@@images\//.test(path) ||
    /\/@@download\//.test(path) ||
    /\/@@site-logo\//.test(path) ||
    /\/@portrait\//.test(path)
  ) {
    const token = await getAuthFromRequest(request);
    throw await fetch(`${config.settings.apiPath}${path}`, {
      method: 'GET',
      headers: {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // This is needed in v7.4.0 even if it should not be mandatory
  // Relevant issue: https://github.com/remix-run/react-router/issues/13274
  return await next();
};

export const unstable_middleware = [
  installServerMiddleware,
  otherResources,
  getAPIResourceWithAuth,
];

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale = await i18next.getLocale(request);

  const expand = ['navroot', 'breadcrumbs', 'navigation'];

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  const path = `/${params['*'] || ''}`;

  try {
    return {
      content: flattenToAppURL((await cli.getContent({ path, expand })).data),
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

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

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
