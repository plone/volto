import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useLoaderData,
  type LinksFunction,
  type MetaFunction,
  type LoaderFunctionArgs,
  RouterContextProvider,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import { RouterProvider as RACRouterProvider } from 'react-aria-components';
import clsx from 'clsx';
import i18next from 'seven/app/i18next.server';
import { ploneContentContext } from 'seven/app/middleware.server';
import { type RootLoader } from 'seven/app/root';
import { PluggablesProvider, Plug } from '@plone/layout/components/Pluggable';
import Toast from '@plone/layout/components/Toast/Toast';
import Toolbar from '@plone/layout/components/Toolbar/Toolbar';
import { shouldShowToolbar } from '@plone/layout/helpers';
import config from '@plone/registry';
import { Button } from '@plone/components/quanta';
import Back from '@plone/components/icons/arrow-left.svg?react';
// import TopNavBar from '@plone/cmsui/components/Layout/TopNavBar';

// eslint-disable-next-line import/no-unresolved
import stylesheet from 'seven/.plone/cmsui.css?url';
import basicComponentsStylesheets from '@plone/components/dist/basic.css?url';
import quantaComponentsStylesheet from '@plone/components/dist/quanta.css?url';

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

export async function loader({
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  const content = context.get(ploneContentContext);
  const locale = await i18next.getLocale(request);
  return { locale, content };
}

export default function Index() {
  const { locale, content } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

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
          </PluggablesProvider>
        </RACRouterProvider>
        <Toast
          queue={config.getUtility({ name: 'queue', type: 'toast' }).method()}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
