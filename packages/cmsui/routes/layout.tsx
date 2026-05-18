import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useRouteLoaderData,
  type LinksFunction,
  type MetaFunction,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import { RouterProvider as RACRouterProvider } from 'react-aria-components';
import { clsx } from 'clsx';
import type { RootLoader } from 'seven/app/root';
import { PluggablesProvider } from '@plone/layout/components/Pluggable';
import Toolbar from '@plone/layout/components/Toolbar/Toolbar';
import { shouldShowToolbar } from '@plone/layout/helpers';
import config from '@plone/registry';

import stylesheet from 'seven/.plone/cmsui.css?url';

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
  const rootData = useRouteLoaderData<RootLoader>('root');
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  if (!rootData) {
    return null;
  }
  const { content, locale } = rootData;
  const contentLanguage = (content?.language as { token?: string } | undefined)
    ?.token;
  const showToolbar = shouldShowToolbar(content);

  return (
    <html lang={contentLanguage || locale || 'en'} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <Meta />
        <Links />
      </head>
      <body className="cmsui">
        {/* We pre-define here the @layer before tailwind does, adding our own layers in a React 19 managed <link> tag */}
        <link rel="stylesheet" href="/layers.css" precedence="first" />
        <RACRouterProvider navigate={navigate}>
          <PluggablesProvider>
            {showToolbar && <Toolbar />}
            <div
              className={clsx({
                'ml-(--plone-toolbar-width)': showToolbar,
              })}
            >
              <Outlet />
            </div>
          </PluggablesProvider>
        </RACRouterProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
