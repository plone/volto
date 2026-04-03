/**
 * layout of @plone/publicui
 */
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigate,
  type UIMatch,
  type LinksFunction,
  type MetaFunction,
  type LoaderFunctionArgs,
  RouterContextProvider,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Link,
  RouterProvider as RACRouterProvider,
} from 'react-aria-components';
import i18next from 'seven/app/i18next.server';
import { ploneContentContext } from 'seven/app/middleware.server';
import type { RootLoader } from 'seven/app/root';
import Pencil from '@plone/components/icons/pencil.svg?react';
import SlotRenderer from '@plone/layout/slots/SlotRenderer';
import Toolbar from '@plone/layout/components/Toolbar/Toolbar';
import { shouldShowToolbar } from '@plone/layout/helpers';
import { Plug, PluggablesProvider } from '@plone/layout/components/Pluggable';
import clsx from 'clsx';
import config from '@plone/registry';

import styles from '@plone/layout/slots/App/App.module.css';
import stylesheet from 'seven/.plone/publicui.css?url';

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
  { rel: 'stylesheet', href: stylesheet },
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

export async function loader({
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  const locale = await i18next.getLocale(request);
  const { data: content } = context.get(ploneContentContext);
  return {
    content,
    cssLayers: config.settings.cssLayers,
    locale,
  };
}

export default function Index() {
  const location = useLocation();
  const { content, locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const matches = useMatches() as UIMatch<unknown, { bodyClass: string }>[];
  const routesBodyClasses = matches
    .filter((match) => match.handle?.bodyClass)
    .map((match) => match.handle?.bodyClass);

  const showToolbar = shouldShowToolbar(content);

  return (
    <html lang={content.language?.token || locale || 'en'} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <Meta />
        <Links />
      </head>
      <body
        className={clsx(routesBodyClasses, {
          'with-toolbar': showToolbar,
        })}
      >
        {/* We pre-define here the @layer before tailwind does, adding our own layers in a React 19 managed <link> tag */}
        <link rel="stylesheet" href="/layers.css" precedence="first" />
        <RACRouterProvider navigate={navigate}>
          <PluggablesProvider>
            <Plug pluggable="toolbar-top" id="button-edit">
              <Link
                className="primary"
                aria-label="Edit"
                href={`/@@edit${location.pathname.replace(/^\/$/, '')}`}
              >
                <Pencil />
              </Link>
            </Plug>
            {showToolbar && <Toolbar />}
            <div id="main">
              <div className={clsx(styles.app, 'app-slot')}>
                <header id="header" className="header-slot">
                  <SlotRenderer
                    name="header"
                    content={content}
                    location={location}
                  />
                </header>
                <div className="content-area">
                  <Outlet />
                </div>
                <footer id="footer">
                  <SlotRenderer
                    name="footer"
                    content={content}
                    location={location}
                  />
                </footer>
              </div>
            </div>
          </PluggablesProvider>
        </RACRouterProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
