# @plone/client

[![NPM](https://img.shields.io/npm/v/@plone/client.svg)](https://www.npmjs.com/package/@plone/client)
[![Build Status](https://github.com/plone/plone.restapi-client/actions/workflows/code.yml/badge.svg)](https://github.com/plone/plone.restapi-client/actions)
[![Build Status](https://github.com/plone/plone.restapi-client/actions/workflows/unit.yml/badge.svg)](https://github.com/plone/plone.restapi-client/actions)
[![Documentation Status](https://app.readthedocs.org/projects/plone-client/badge/?version=latest)](https://plone-client.readthedocs.io/en/latest/?badge=latest)

The JavaScript Plone client is an agnostic library that provides easy access to the [Plone REST API](https://github.com/plone/plone.restapi/) from a client written in TypeScript.
This client can be used as an alternative to directly interacting with the Plone REST API.
It should be possible to use it in React, Vue, Solid, Svelte, or other projects.

The API request layer builds and sends arbitrary requests to Plone REST API endpoints.
It has the potential to send requests to other APIs, when provided the custom query options factories.

These functions can be used in other use cases, including command line helpers, scripts, or programmatic tests.

> [!WARNING]
> This package moved his active development to the `seven` branch.
> This package will continue indefinitely in alpha version and it will be maintained here (1.0.0-alpha.x) if any bug is needed to fix.
> See breaking changes in the upcoming alphas.

## Installation

To install the JavaScript Plone client run the following command.

```shell
yarn add @plone/client
```

## `PloneClient` entry point

The main artifact that the client provides is the `PloneClient` entry point.

Once imported, you should call `initialize` to set up its basic parameters, including `apiPath`, headers, or authentication options.

After initialization, you can import all the provided query options factories.

```ts
import PloneClient from '@plone/client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
});
```


## Query the API

To fetch data from the REST API, you can query the API calls directly from the `PloneClient`.

```ts
const { status, data } = await cli.getContent({ path: pathname });
```


## File structure used

The file structure should match the one in the `plone.restapi` package.
It should be organized in folders, one for each endpoint family, and follow the naming convention according to the action of create, get, update, or delete.


## Documentation

The documentation should match the one in `plone.restapi` package.
It's organized according to endpoint services.


## Resources

-   [`plone.restapi`](https://github.com/plone/plone.restapi)
-   [`plone.restapi` documentation](https://plonerestapi.readthedocs.io/en/latest/)
-   [Volto](https://github.com/plone/volto)
