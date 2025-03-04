# @plone/client

[![NPM](https://img.shields.io/npm/v/@plone/client.svg)](https://www.npmjs.com/package/@plone/client)
[![Build Status](https://github.com/plone/plone.restapi-client/actions/workflows/code.yml/badge.svg)](https://github.com/plone/plone.restapi-client/actions)
[![Build Status](https://github.com/plone/plone.restapi-client/actions/workflows/unit.yml/badge.svg)](https://github.com/plone/plone.restapi-client/actions)
[![Documentation Status](https://readthedocs.org/projects/plone-client/badge/?version=latest)](https://plone-client.readthedocs.io/en/latest/?badge=latest)

## Introduction

The Javascript Plone client is an agnostic library that provides easy access to the Plone REST API from a client written in TypeScript.
This client can be used as an alternative to directly interacting with the Plone REST API.
It is based on the foundations that [@tanstack/query](https://tanstack.com/query) lays off.
It should be possible to use it in React/Vue/Solid/Svelte projects.
It provides the artifacts that TanStack Query requires to work:

- Query (or mutation) options factories
- Query (or mutation) functions
- API request layer

The API request layer allows to build and send arbitrary requests to Plone REST API endpoints.
It has the potential to also be able to send requests to other APIs (provided the custom Query options factories/functions).

The Javascript Plone client is conceived to work with TanStack Query, the query or mutation functions can be used to call any Plone REST API endpoint without using it.
These functions can be used in other use cases like command line helpers, scripts or programatic tests.

## Installation​

To install the Javascript Plone client run the following command:

```shell
yarn add @plone/client
```

## `ploneClient` entry point

The main artifact that the client provides is the `ploneClient` entry point.

Once imported, you should call `initialize` to setup its basic parameters, like `apiPath`, headers or authentication options.

After initialization, you can import all the prorvided query options factories.

```ts
import ploneClient from '@plone/client';

const client = ploneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
});
```

## Query (or mutation) options factories

A query (or mutation) options factory is a TanStack Query basic artifact, a function that returns an object, ready to be passed to a React Query hook (in case that we are in a React environment) or to the TanStack Query adapter that we are using in our framework.

```ts
import { useQuery } from '@tanstack/react-query';

const { getContentQuery } = client;

const { data, isLoading } = useQuery(getContentQuery({ path: pathname }));
```

The query (or mutation) factories ara functions that take an object as arguments.
These arguments can have some common properties (like the path) and other specific depending on the nature of the endpoint that they are correspond with.

This is a complete example of the usage of the client in a React client component:

```jsx
import { useQuery } from '@tanstack/react-query';
import ploneClient from '@plone/client';
import { usePathname } from 'next/navigation';

const client = ploneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
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

## Plone Client React Hooks

This package also provides custom hooks for actions that can be used directly in functional React components.

```ts
const { useGetContent } = client;

const { data, isLoading } = useGetContent({ path: pathname });
```

## File Structure used

The file structure should match the one in `plone.restapi` package, so it should be organized in folders one for each endpoint family, and following the convention naming depending on the action (add, get, update, delete).

## Documentation

The documentation should match the one in `plone.restapi` package, so it's organized in endpoint services.

## Resources

[plone.restapi](https://github.com/plone/plone.restapi)

[plone.restapi documentation](https://plonerestapi.readthedocs.io/en/latest/)

[Volto](https://github.com/plone/volto)
