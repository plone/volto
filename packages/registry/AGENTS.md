# AGENTS.md

This file applies only to `packages/registry` and its subdirectories.

## What This Package Is

- `@plone/registry` is the **add-on and configuration registry** — the extensibility backbone of Seven and other Plone JS/TS apps.
- It provides the infrastructure to build pluggable, extensible applications where add-ons can register and override configuration, components, blocks, and more.
- It also includes a **Vite plugin** (`vite-plugin`) that integrates the add-on registry into the build pipeline.

## Package Model

- `src/addon-registry/` — the core add-on registry implementation.
- `src/index.ts` — main entry point; exports the registry API.
- `src/vite-plugin.test.tsx` — integration tests for the Vite plugin.
- Compiled with **tsup**.

## Editing Rules

- The registry is the single source of truth for app and add-on configuration. Keep its API **stable and well-typed**.
- When adding new registry capabilities, export them from `src/index.ts` and add tests.
- The Vite plugin must remain compatible with the monorepo's Vite setup. Test any plugin changes against `apps/seven`.
- Avoid introducing runtime side effects or global state outside of the registry's own initialization flow.

## Validation

```sh
pnpm --filter @plone/registry test --run
pnpm --filter @plone/registry build
pnpm --filter @plone/registry check:ts
pnpm --filter @plone/registry check:exports
```
