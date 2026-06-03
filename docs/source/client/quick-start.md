# Quick start

The JavaScript Plone client is a library that provides easy access to the Plone REST API from a client written in TypeScript.
This client can be used as an alternative to directly interacting with the Plone REST API.
It's based on the foundation of [@tanstack/query](https://tanstack.com/query/latest).
It should be possible to use it in React/Vue/Solid/Svelte projects.
It provides the artifacts that TanStack Query requires to work:

- Query (or mutation) options factories
- Query (or mutation) functions
- API request layer

The API request layer allows to build and send arbitrary requests to Plone REST API endpoints.
It has the potential to send requests to other APIs, provided through the custom Query options for factories and functions.

The JavaScript Plone client is conceived to work with TanStack Query.
The query or mutation functions can be used to call any Plone REST API endpoint without using it.
These functions can be used in other use cases like command line helpers, scripts or programmatic tests.

## Installation​

To install the JavaScript Plone client run the following command:

```shell
pnpm add @plone/client
```

or use your package manager of choice.

## `ploneClient` entry point

The main artifact that the client provides is the `ploneClient` entry point.

Once imported, you should call `initialize` to setup its basic parameters, like `apiPath`, headers or authentication options.

After initialization, you can import all the provided query options factories.

```ts
import ploneClient from '@plone/client';

const client = ploneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
  token: '', // Optional: auth_token to authorize the user
});
```

## Query (or mutation) options factories

A query (or mutation) options factory in TanStack Query is a function providing an object for React Query hooks or the utilized framework's Query adapter.

```ts
import { useQuery } from '@tanstack/react-query';

const { getContentQuery } = client;

const { data, isLoading } = useQuery(getContentQuery({ path: pathname }));
```

The query (or mutation) factories are functions that take an object as arguments.
These arguments can have some common properties, such as the path, and other specific depending on the nature of the endpoint that they're correspond with.

This is a complete example of the usage of the client in a React client component:

```jsx
import { useQuery } from '@tanstack/react-query';
import ploneClient from '@plone/client';
import { usePathname } from 'next/navigation';

const client = ploneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
  token: '', // Optional: auth_token to authorize the user
});

export default function Title() {
  const { getContentQuery } = client;
  const pathname = usePathname();
  const { data, isLoading } = useQuery(getContentQuery({ path: pathname }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div>
        <h1>{data.title}</h1>
      </div>
    );
  }

  return '';
}
```

## Plone client react hooks

This package also provides custom hooks for actions that can be used directly in functional React components.

```ts
const { useGetContent } = client;

const { data, isLoading } = useGetContent({ path: pathname });
```
