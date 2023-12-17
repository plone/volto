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

### Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

### Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

#### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
