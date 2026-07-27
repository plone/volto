# AGENTS.md

This file applies only to `packages/volto-razzle` and its subdirectories.

## What This Package Is

- `@plone/razzle` is Volto's fork of the Razzle app toolchain.
- It owns build, start, and webpack-related behavior used by `@plone/volto`.

## Editing Rules

- Prefer changes that implies minimal necessary divergence from the base Razzle toolchain. This fork should be as close to the original as possible while still supporting Volto's needs.
- Treat this package as build infrastructure. Changes can affect startup, production builds, HMR, and SSR.
- Preserve compatibility with `@plone/razzle-dev-utils` and `@plone/babel-preset-razzle`.
- Avoid app-specific shortcuts unless they are already established design in this fork.

## Validation

```sh
pnpm --filter @plone/razzle test --run
pnpm --filter @plone/volto build
pnpm --filter @plone/volto start
```
