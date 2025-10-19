/**
 * layout of @plone/publicui
 */
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useMatches,
  useNavigate,
  useRouteLoaderData,
  type UIMatch,
  type LinksFunction,
  type MetaFunction,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import { RouterProvider as RACRouterProvider } from 'react-aria-components';
import type { RootLoader } from 'seven/app/root';
import SlotRenderer from '@plone/layout/slots/SlotRenderer';
import clsx from 'clsx';
import config from '@plone/registry';

import styles from '@plone/layout/slots/App/App.module.css';

// eslint-disable-next-line import/no-unresolved
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

export async function loader() {
  return { cssLayers: config.settings.cssLayers };
}

export default function Index() {
  const location = useLocation();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const matches = useMatches() as UIMatch<unknown, { bodyClass: string }>[];
  const routesBodyClasses = matches
    .filter((match) => match.handle?.bodyClass)
    .map((match) => match.handle?.bodyClass);

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
      <body className={clsx(routesBodyClasses)}>
        {/* We pre-define here the @layer before tailwind does, adding our own layers in a React 19 managed <link> tag */}
        <link rel="stylesheet" href="/layers.css" precedence="first" />
        <div role="navigation" aria-label="Toolbar" id="toolbar" />
        <div id="main">
          <RACRouterProvider navigate={navigate}>
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
          </RACRouterProvider>
        </div>
        <div role="complementary" aria-label="Sidebar" id="sidebar" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
