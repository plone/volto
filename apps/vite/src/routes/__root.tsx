import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import * as React from 'react';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router';
import { DehydrateRouter } from '@tanstack/react-router-server/client';
import { RouterContext } from '../routerContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PloneClientProvider } from '@plone/client/provider';
import PloneClient from '@plone/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();
  const [ploneClient] = React.useState(() =>
    PloneClient.initialize({
      apiPath: 'http://localhost:8080/Plone',
    }),
  );

  return (
    <html lang="en">
      {router.options.context.head ? (
        <head
          dangerouslySetInnerHTML={{
            __html: router.options.context.head,
          }}
        ></head>
      ) : (
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Vite App</title>
          <script src="https://cdn.tailwindcss.com" />
          <script
            type="module"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `
              import RefreshRuntime from "/@react-refresh"
              RefreshRuntime.injectIntoGlobalHook(window)
              window.$RefreshReg$ = () => {}
              window.$RefreshSig$ = () => (type) => type
              window.__vite_plugin_react_preamble_installed__ = true
            `,
            }}
          />
          <script type="module" src="/@vite/client" />
          <script type="module" src="/src/entry-client.tsx" />
        </head>
      )}
      <body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>{' '}
          <Link
            to="/error"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Error
          </Link>
        </div>
        <hr />
        <PloneClientProvider client={ploneClient}>
          <QueryClientProvider client={router.options.context.queryClient}>
            <Outlet /> {/* Start rendering router matches */}
            <ReactQueryDevtools buttonPosition="top-right" />
          </QueryClientProvider>
        </PloneClientProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <DehydrateRouter />
      </body>
    </html>
  );
}
