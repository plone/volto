# Quick start

The JavaScript Plone client is a library that provides easy access to the Plone REST API from a client written in TypeScript.
This client can be used as an alternative to directly interacting with the Plone REST API.
It should be possible to use it in React/Vue/Solid/Svelte projects.
It provides a set of building blocks for declarative data fetching:

- Query (or mutation) options factories
- Query (or mutation) functions
- API request layer

The API request layer allows you to build and send arbitrary requests to Plone REST API endpoints.
It has the potential to send requests to other APIs, when you provide custom query options factories and functions.

The JavaScript Plone client is designed to integrate with data‑fetching libraries, but its query and mutation functions can also be used directly.
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

A query (or mutation) options factory is a function that returns a configuration object describing how to fetch data.
The factory functions take an object as arguments.
These arguments can have some common properties, such as the path, and others that depend on the nature of the endpoint they correspond with.

This is a complete example of the usage of the client in a React client component:

```jsx
import ploneClient from '@plone/client';
import { usePathname } from 'next/navigation';

const client = ploneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
  token: '', // Optional: auth_token to authorize the user
});

export default function Title() {
  const { useGetContent } = client;
  const pathname = usePathname();
  const { data, isLoading } = useGetContent({ path: pathname });

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
