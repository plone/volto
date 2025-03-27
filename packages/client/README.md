# @plone/client

[![NPM](https://img.shields.io/npm/v/@plone/client.svg)](https://www.npmjs.com/package/@plone/client)
[![Build Status](https://github.com/plone/plone.restapi-client/actions/workflows/code.yml/badge.svg)](https://github.com/plone/plone.restapi-client/actions)
[![Build Status](https://github.com/plone/plone.restapi-client/actions/workflows/unit.yml/badge.svg)](https://github.com/plone/plone.restapi-client/actions)
[![Documentation Status](https://app.readthedocs.org/projects/plone-client/badge/?version=latest)](https://plone-client.readthedocs.io/en/latest/?badge=latest)

## Introduction

The Javascript Plone client is an agnostic library that provides easy access to the Plone REST API from a client written in TypeScript.
This client can be used as an alternative to directly interacting with the Plone REST API.
It should be possible to use it in React/Vue/Solid/Svelte projects.

The API request layer allows to build and send arbitrary requests to Plone REST API endpoints.
It has the potential to also be able to send requests to other APIs (provided the custom Query options factories/functions).

These functions can be used in other use cases like command line helpers, scripts or programatic tests.

## Installation​

To install the Javascript Plone client run the following command:

```shell
yarn add @plone/client
```

## `PloneClient` entry point

The main artifact that the client provides is the `PloneClient` entry point.

Once imported, you should call `initialize` to setup its basic parameters, like `apiPath`, headers or authentication options.

After initialization, you can import all the provided query options factories.

```ts
import PloneClient from '@plone/client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
});
```

## Query the api

When you want to fetch data from the REST API you can call all the api calls directly from the `PloneClient`.

```ts
const { status, data } = await cli.getContent({ path: pathname });
```

## File Structure used

The file structure should match the one in `plone.restapi` package, so it should be organized in folders one for each endpoint family, and following the convention naming depending on the action (create, get, update, delete).

## Documentation

The documentation should match the one in `plone.restapi` package, so it's organized in endpoint services.

## Resources

[plone.restapi](https://github.com/plone/plone.restapi)

[plone.restapi documentation](https://plonerestapi.readthedocs.io/en/latest/)

[Volto](https://github.com/plone/volto)
