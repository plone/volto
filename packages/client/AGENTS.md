# AGENTS.md

This file applies only to `packages/client` and its subdirectories.

## What This Package Is

- `@plone/client` is a framework-agnostic TypeScript client for the Plone REST API.
- It is intended to work outside Volto too, so keep it UI-free and React-free.
- The package is built with `tsup` and validated with `vitest` and TypeScript checks.

## Package Model

- `src/client.ts` contains the main `PloneClient` entry point.
- `src/restapi/` mirrors REST API endpoint families. Follow that organization when adding new endpoints.
- `src/api.ts` and related query helpers should stay consistent in naming and factory shape.
- Keep request and response types explicit and exported through the package surface where appropriate.

## Editing Rules

- Prefer TypeScript for all new modules and features.
- Refactoring touched code toward TypeScript is welcome, but not required.
- Do not import React, browser-only UI helpers, or Volto app code.
- Match existing endpoint naming and folder structure to `plone.restapi` concepts.
- Add or update tests for new endpoint helpers and client behavior.

## Validation

```sh
pnpm --filter @plone/client test --run
pnpm --filter @plone/client build
pnpm --filter @plone/client check:ts
pnpm --filter @plone/client check:exports
```
