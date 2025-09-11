import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useLoaderData,
  useRouteLoaderData,
  type LinksFunction,
  type MetaFunction,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import { RouterProvider as RACRouterProvider } from 'react-aria-components';
import { type RootLoader } from 'seven/app/root';
import { PluggablesProvider, Plug } from '@plone/layout/components/Pluggable';
import Toolbar from '@plone/cmsui/components/Toolbar/Toolbar';
import config from '@plone/registry';
import { Button } from '@plone/components/quanta';
import Back from '@plone/components/icons/arrow-left.svg?react';
// import TopNavBar from '@plone/cmsui/components/Layout/TopNavBar';

// eslint-disable-next-line import/no-unresolved
import stylesheet from 'seven/cmsui.css?url';
import basicComponentsStylesheets from '@plone/components/dist/basic.css?url';
import quantaComponentsStylesheet from '@plone/components/dist/quanta.css?url';
import Toast from '@plone/layout/components/Toast/Toast';

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
  // { rel: 'stylesheet', href: publicStylesheet },

  { rel: 'stylesheet', href: basicComponentsStylesheets },
  { rel: 'stylesheet', href: quantaComponentsStylesheet },
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
  const { cssLayers } = useLoaderData<typeof loader>();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  if (!rootData) {
    return null;
  }
  const { content, locale } = rootData;
  // console.log(i18n);

  return (
    <html lang={content.language?.token || locale || 'en'}>
      {/* dir={i18n.dir()} */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* We pre-define here the @layer before tailwind does, adding our own layers */}
        <style>{`@layer ${cssLayers.join(', ')};`}</style>
        <Meta />
        <Links />
      </head>
      <body className="cmsui">
        <PluggablesProvider>
          <RACRouterProvider navigate={navigate}>
            <div className="grid grid-cols-[80px_1fr_0px] transition-[grid-template-columns] duration-200 ease-linear">
              <Toolbar />
              <main id="main">
                {/* <TopNavBar /> */}
                <Outlet />
              </main>
            </div>
            <Plug pluggable="toolbar-top" id="button-back">
              <Button
                aria-label="back"
                size="L"
                onPress={() => {
                  navigate(
                    window.location.pathname
                      .replace('/@@contents', '/')
                      .replaceAll('//', '/'),
                  );
                }}
              >
                <Back />
              </Button>
            </Plug>
          </RACRouterProvider>
        </PluggablesProvider>
        <Toast
          queue={config.getUtility({ name: 'queue', type: 'toast' }).method()}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
