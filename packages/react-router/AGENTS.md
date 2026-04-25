# AGENTS.md

This file applies only to `packages/react-router` and its subdirectories.

## What This Package Is

- `@plone/react-router` is a **thin bridge over React Router 7** for Plone/Seven.
- It provides Plone-specific wrappers for React Router hooks (`useHref`, `useLocation`, `useParams`, `navigate`) used by `@plone/providers` and other packages.
- It also provides the **Vite configuration** needed for React Router 7 + `@plone/registry` integration.

> [!WARNING]
> This package is experimental. Breaking changes may occur without notice.

## Package Model

- `src/index.ts` is the primary entry point — it exports the Plone-flavored router hooks and Vite config helpers.
- Compiled with **tsup**.

## Editing Rules

- Keep this package **thin**. Do not add routing logic beyond what is needed to bridge React Router 7 APIs to Plone's conventions.
- If adding a new hook, it should wrap an existing React Router 7 hook — not reimplement routing behavior.
- Vite configuration additions should be clearly separated from hook exports.
- Do not import UI components or React context providers here.

## Validation

```sh
pnpm --filter @plone/react-router test --run
pnpm --filter @plone/react-router build
pnpm --filter @plone/react-router check:exports
```
