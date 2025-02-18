# Plone 7

> [!WARNING]
> This package and all the efforts around it are not even in an alpha state and are experimental.
> The community offers no support whatsoever for it.
> Breaking changes may occur without notice.

This is the initial (and very early) implementation of Plone 7.
After the design and first implementations of all the required pieces (the `@plone/*` libraries) that will compose Plone 7, this package will concentrate all the development during the next years.

It is based on [React Router](https://reactrouter.com/dev/docs) 7, using the `@plone/*` libraries.

The name of this package and its folder name in `packages` may also change since it's undecided yet.

## Releases

Even in experimental phase, this package will be soft released periodically, under a tag.
This will provide a way to try it out in real development and deploy scenarios.

## Development

To start, from the root of the monorepo, issue the following commands.

```shell
pnpm install
pnpm --filter plone7 run dev
```

Then start the Plone backend.

```shell
make backend-docker-start
```
