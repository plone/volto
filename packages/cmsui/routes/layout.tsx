import {
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
import type { RootLoader } from 'seven/app/root';
import { PluggablesProvider } from '@plone/layout/components/Pluggable';
import Toolbar from '../components/Toolbar/Toolbar';
import Sidebar, { sidebarAtom } from '../components/Sidebar/Sidebar';
import TopNavBar from '../components/Layout/TopNavBar';
import { useAtom } from 'jotai';
import { clsx } from 'clsx';
import config from '@plone/registry';

// eslint-disable-next-line import/no-unresolved
import publicStylesheet from 'seven/publicui.css?url';
// eslint-disable-next-line import/no-unresolved
import stylesheet from 'seven/cmsui.css?url';

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
  { rel: 'stylesheet', href: publicStylesheet },
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
  const [collapsed] = useAtom(sidebarAtom);

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
      <body className="cmsui">
        {/* We pre-define here the @layer before tailwind does, adding our own layers in a React 19 managed <link> tag */}
        <link rel="stylesheet" href="/layers.css" precedence="first" />
        <PluggablesProvider>
          <div
            className={clsx(
              'grid transition-[grid-template-columns] duration-200 ease-linear',
              {
                'grid-cols-[80px_1fr_300px]': !collapsed,
                'grid-cols-[80px_1fr_0px]': collapsed,
              },
            )}
          >
            <Toolbar />
            <div id="main">
              <TopNavBar />
              <Outlet />
            </div>
            <Sidebar />
          </div>
        </PluggablesProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
