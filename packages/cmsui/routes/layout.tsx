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
import {
  Pluggable,
  Plug,
  PluggablesProvider,
  createPluggableAndPlug,
} from '../components/Pluggable';

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
        <PluggablesProvider>
          <div role="navigation" aria-label="Toolbar" id="toolbar">
            <Pluggable name="toolbar" />
          </div>
          <div id="main">
            <Outlet />
          </div>
          <div role="complementary" aria-label="Sidebar" id="sidebar" />
        </PluggablesProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
