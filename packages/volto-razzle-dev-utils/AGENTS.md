# AGENTS.md

This file applies only to `packages/volto-razzle-dev-utils` and its subdirectories.

## What This Package Is

- `@plone/razzle-dev-utils` contains helper utilities used by Volto's Razzle fork.
- These files mostly support developer experience, logging, error formatting, and webpack/dev-server integration.

## Editing Rules

- Prefer changes that implies minimal necessary divergence from the base Razzle toolchain. This fork should be as close to the original as possible while still supporting Volto's needs.
- Keep utilities Node-compatible and toolchain-focused.
- Changes here should be small and traceable to an observable build or dev-server problem.
- Favor compatibility with the current webpack and Razzle integration over broad refactors.

## Validation

This package has no dedicated test script.
Validate through a consuming workflow such as:

```sh
pnpm --filter @plone/volto start
pnpm --filter @plone/volto build
```
