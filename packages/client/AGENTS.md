# AGENTS.md

This file applies only to `packages/client` and its subdirectories.

## What This Package Is

- `@plone/client` is a **framework-agnostic JavaScript/TypeScript client** for the Plone REST API.
- It can be used in React, Vue, Svelte, or any other JS/TS project, as well as in scripts and CLI tools.
- The library is written in TypeScript and compiled with **tsup**.
- The request layer builds and sends queries to Plone REST API endpoints. Custom query option factories allow targeting other APIs too.

## Package Model

- The main entry point is the `PloneClient` class in `src/client.ts`. Callers call `initialize()` to configure `apiPath`, headers, and auth.
- REST API operations live under `src/restapi/` organized by endpoint domain (e.g., `content`, `breadcrumbs`, `login`).
- Keep this package **framework-agnostic**: do not import React, React hooks, or any UI framework.
- Query/mutation factories in `src/api.ts` and the `restapi/` modules follow a consistent pattern — match it when adding new endpoints.
- Validation utilities live in `src/validation/`.

## Editing Rules

- Do not import React or any UI framework.
- When adding a new REST API endpoint, follow the existing pattern in `src/restapi/` and export from `src/index.ts`.
- Include TypeScript types for all request and response shapes.
- Write tests for new query/mutation factories.

## Validation

```sh
pnpm --filter @plone/client test --run
pnpm --filter @plone/client build
pnpm --filter @plone/client check:ts
pnpm --filter @plone/client check:exports
```
