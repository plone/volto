import * as React from 'react';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router';
import { DehydrateRouter } from '@tanstack/react-router-server/client';
import { RouterContext } from '../routerContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-aria-components';

import '@plone/components/dist/basic.css';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();

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
          <title>Plone on Vite SSR build</title>
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
        <RouterProvider
          navigate={(path: string) => router.navigate({ to: path })}
        >
          <Outlet /> {/* Start rendering router matches */}
        </RouterProvider>
        <ReactQueryDevtools buttonPosition="top-right" />
        <TanStackRouterDevtools position="bottom-right" />
        <DehydrateRouter />
      </body>
    </html>
  );
}
