# AGENTS.md

This file applies only to `packages/providers` and its subdirectories.

## What This Package Is

- `@plone/providers` provides **React context providers** for dependency injection in Seven apps.
- Its main export is `PloneProvider`, which bundles together:
  - `@plone/client` (API client and `QueryClient`)
  - `@plone/react-router` wrappers (routing hooks: `useLocation`, `useParams`, `navigate`, `useHref`)
  - URL helpers (`flattenToAppURL`)
- Apps wrap their component tree with `PloneProvider` to inject all these dependencies at once.

> [!WARNING]
> This package is experimental. Breaking changes may occur without notice.

## Package Model

- `PloneProvider.tsx` — the main composite provider.
- `PloneClient.tsx` — provider for the Plone REST API client.
- `AppRouter.tsx` — provider for router integration.
- `utils.ts` — shared utilities.
- Everything is exported from `src/index.ts`.
- Compiled with **tsup**.

## Editing Rules

- Keep this package as a **thin injection layer**. Do not add UI components, data-fetching logic, or business logic here.
- When extending `PloneProvider`, add the new injection point to the `PloneProvider` interface definition so consumers can access it via typed context.
- Do not introduce side effects in providers — they must be safe to render in both SSR and CSR environments.

## Validation

```sh
pnpm --filter @plone/providers test --run
pnpm --filter @plone/providers build
pnpm --filter @plone/providers check:exports
```
