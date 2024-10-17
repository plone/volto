# `@plone/providers`

This package contains utility providers for Plone React components.
The main purpose is to provide dependency injection of common required artifacts needed by any app.
This artifacts are:
- Router related
- Plone Client
- URL handling methods

> [!WARNING]
> This package or app is experimental.
> The community offers no support whatsoever for it.
> Breaking changes may occur without notice.

## `PloneProvider`

It provides all the necessary artifacts that an app can need grouped in a single provider.

```ts
interface PloneProvider {
  ploneClient: InstanceType<typeof PloneClient>;
  queryClient: QueryClient;
  useLocation: () => Location | undefined;
  useParams: (opts?: any) => Record<string, string>;
  navigate: (path: string) => void;
  useHref: (to: string, options?: any) => string;
  flattenToAppURL: (path: string | undefined) => string | undefined;
}
```

It should be instantated at the top of your app.
You have to provide the required props depending on the framework and the router used.
This is the example for a Next.js app.
Please refer to the {file}`apps` folder of the Volto repository for more examples of the usage of `PloneProvider` in different React frameworks.

```tsx
'use client';
import React from 'react';
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from 'next/navigation';
import { QueryClient } from '@tanstack/react-query';
import { PloneProvider } from '@plone/providers';
import PloneClient from '@plone/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { flattenToAppURL } from './utils';
import config from './config';

// Custom hook to unify the location object between NextJS and Plone
function useLocation() {
  let pathname = usePathname();
  let search = useSearchParams();

  return {
    pathname,
    search,
    searchStr: '',
    hash: (typeof window !== 'undefined' && window.location.hash) || '',
    href: (typeof window !== 'undefined' && window.location.href) || '',
  };
}

const Providers: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  // Creating the clients at the file root level makes the cache shared
  // between all requests and means _all_ data gets passed to _all_ users.
  // Besides being bad for performance, this also leaks any sensitive data.
  // We use this pattern to ensure that every client gets its own clients
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  const [ploneClient] = React.useState(() =>
    PloneClient.initialize({
      apiPath: config.settings.apiPath,
    }),
  );

  const router = useRouter();

  return (
    <PloneProvider
      ploneClient={ploneClient}
      queryClient={queryClient}
      // NextJS doesn't have a useLocation hook, so we need to unify this
      // in a custom hook
      useLocation={useLocation}
      navigate={(to) => {
        router.push(to);
      }}
      useParams={useParams}
      useHref={(to) => flattenToAppURL(to)}
      flattenToAppURL={flattenToAppURL}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PloneProvider>
  );
};

export default Providers;

```

You can use anywhere in your app by using the hook `usePloneProvider`.

```tsx
import { usePloneProvider } from '@plone/providers';

const { ploneClient } = usePloneProvider()
```

or any other context property.

```tsx
const { navigate } = usePloneProvider()
```

### `PloneClientProvider`

`PloneProvider` in a group of other smaller providers.
In case you need them separatedly, you can also instantiate and use them standalone.
However, only do this is the framework has some limitation on using the bulk `PloneClientProvider`.

```ts
export type PloneClientProviderProps = {
  client: InstanceType<typeof PloneClient>;
  queryClient: QueryClient;
  children?: React.ReactNode;
};
```

and the related hook:

```tsx
import { usePloneClient } from '@plone/providers';

const client = usePloneClient()
```

or

```tsx
const { getContentQuery } = usePloneClient()
```

### `AppRouterProvider`

This provider is included also in `PloneProvider`.
In case you need it separatedly, you can also instantiate and use it standalone.
However, only do this is the framework has some limitation on using the bulk `PloneClientProvider`.

```ts
interface AppRouterProps {
  useLocation: () => Location | undefined;
  useParams: (opts?: any) => Record<string, string>;
  navigate: (path: string) => void;
  useHref?: (to: string, options?: any) => string;
  flattenToAppURL: (path: string | undefined) => string | undefined;
  children: ReactNode;
}
```

and the related hook:

```tsx
import { useAppRouter } from '@plone/providers';

const { useLocation } = useAppRouter()
```
