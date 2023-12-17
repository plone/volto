# Plone on Remix

This is a proof of concept of a [Remix](https://remix.run) app, using `@plone/client` and `@plone/components` library. This is intended to serve as both a playground for the development of both packages and as demo of Plone using Remix.

## Development

To start, from the root of the monorepo:

```shell
pnpm install
pnpm --filter plone-remix run dev
```

Then start the Plone backend:

```shell
make start-backend-docker
```

## About this app

- [Remix Docs](https://remix.run/docs)
