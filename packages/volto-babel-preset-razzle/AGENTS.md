# AGENTS.md

This file applies only to `packages/volto-babel-preset-razzle` and its subdirectories.

## What This Package Is

- `@plone/babel-preset-razzle` is Volto's forked Babel preset for the Razzle toolchain.
- It is low-level build infrastructure shared by other tooling packages.

## Editing Rules

- Prefer TypeScript for all new modules and features where the package format allows it.
- Refactoring touched code toward TypeScript is welcome where the package format allows it, but it is not required.
- Prefer conservative changes. Small Babel behavior changes can affect the entire app build.
- Keep compatibility with the surrounding Razzle packages in this repo.
- When changing plugin ordering or transform behavior, verify the downstream package that motivated the change.

## Validation

There is no dedicated test script here.
Validate through the consuming toolchain, usually:

```sh
pnpm --filter @plone/volto build
pnpm --filter @plone/volto test --run
```
