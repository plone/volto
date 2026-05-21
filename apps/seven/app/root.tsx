import type { PropsWithChildren } from 'react';
import { Container } from '@plone/components';
import { data, isRouteErrorResponse, Links } from 'react-router';
import stylesheet from 'seven/.plone/cmsui.css?url';
import { useChangeLanguage } from 'remix-i18next/react';
import i18next from './i18next.server';
import type { Route } from './+types/root';
import config from '@plone/registry';
import {
  ploneClearAuthCookieContext,
  fetchPloneContent,
  getAPIResourceWithAuth,
  installServerMiddleware,
  PloneClientMiddleware,
  otherResources,
  ploneClientContext,
  ploneContentContext,
  ploneSiteContext,
} from './middleware.server';
import Forbidden from '@plone/cmsui/routes/forbidden';
import Unauthorized from '@plone/cmsui/routes/unauthorized';
import NotFound from '@plone/cmsui/routes/notfound';
import ConnectionRefused from '@plone/cmsui/routes/connection-refused';
import { getClearAuthCookieHeader } from '@plone/react-router';

export const middleware = [
  installServerMiddleware,
  PloneClientMiddleware,
  otherResources,
  getAPIResourceWithAuth,
  fetchPloneContent,
];

export async function loader({ params, request, context }: Route.LoaderArgs) {
  const locale = await i18next.getLocale(request);

  const cli = context.get(ploneClientContext);
  const content = context.get(ploneContentContext);
  const site = context.get(ploneSiteContext);

  const path = `/${params['*'] || ''}`;

  const rootLoaderDataUtilities = config.getUtilities({
    type: 'rootLoaderData',
  });

  const rootContentSubRequests = config.getUtilities({
    type: 'rootContentSubRequest',
  });

  try {
    for (const utility of rootContentSubRequests) {
      await utility.method({
        cli,
        content,
        request,
        path,
        params,
        locale,
      });
    }

    const rootLoaderDataUtilitiesData = await Promise.all([
      ...rootLoaderDataUtilities.map((utility) =>
        utility.method({
          cli,
          content,
          request,
          path,
          params,
          locale,
        }),
      ),
    ]);

    const loaderData = {
      content,
      site,
      locale,
      ...rootLoaderDataUtilitiesData
        .filter((item) => item)
        .reduce((acc, item) => ({ ...acc, ...item }), {}),
    };

    return data(loaderData, {
      headers: context.get(ploneClearAuthCookieContext)
        ? {
            'Set-Cookie': await getClearAuthCookieHeader(),
          }
        : undefined,
    });
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

// ToDo: improve error page and error handling
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  let ErrorContent: React.ReactElement;

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 403:
        ErrorContent = <Forbidden />;
        break;
      case 404:
        ErrorContent = <NotFound />;
        break;
      case 500:
      case 503:
        ErrorContent = <ConnectionRefused />;
        break;
      case 401:
        ErrorContent = <Unauthorized />;
        break;
      default:
        ErrorContent = (
          <Container className="mx-20 my-16">
            <h1 className="mb-4 text-2xl font-bold">{message}</h1>
            <p className="mb-3 text-lg">{details}</p>
          </Container>
        );
        break;
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
    ErrorContent = (
      <Container className="mx-20 my-16">
        <h1 className="mb-4 text-2xl font-bold">{message}</h1>
        <p className="mb-3 text-lg">{details}</p>
        {stack && (
          <pre className="w-full overflow-x-auto rounded bg-gray-100 p-4 text-sm text-red-600">
            <code>{stack}</code>
          </pre>
        )}
      </Container>
    );
  } else {
    ErrorContent = (
      <Container className="mx-20 my-16">
        <h1 className="mb-4 text-2xl font-bold">{message}</h1>
        <p className="mb-3 text-lg">{details}</p>
      </Container>
    );
  }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" href={stylesheet} />
        <Links />
      </head>
      <body>{ErrorContent}</body>
    </html>
  );
}
