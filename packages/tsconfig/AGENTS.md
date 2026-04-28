# AGENTS.md

This file applies only to `packages/tsconfig` and its subdirectories.

## What This Package Is

- `tsconfig` provides **shared TypeScript configuration files** for the monorepo.
- Packages reference these files via `"extends": "tsconfig/react-library.json"` (or `base.json`) in their own `tsconfig.json`.
- This ensures consistent TypeScript compiler options across all packages.

## Available Configurations

| File | Use case |
|---|---|
| `base.json` | Base TypeScript settings for any package |
| `react-library.json` | Extends `base.json`; adds React-specific settings for library packages |

## Editing Rules

- Changes here affect **every package that extends these configs**. Test the impact across the monorepo before merging.
- Do not add package-specific settings here — keep settings generic and applicable to all consumers.
- When the TypeScript version is upgraded, update the compiler options here and verify all packages still type-check.

## Validation

Type-check all packages from the repo root:

```sh
pnpm --filter @plone/* run check:ts --if-present
```

Or validate a specific package after changing a config:

```sh
pnpm --filter @plone/<package> check:ts
```
