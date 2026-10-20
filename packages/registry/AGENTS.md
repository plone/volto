# AGENTS.md

This file applies only to `packages/registry` and its subdirectories.

## What This Package Is

- `@plone/registry` provides Volto's add-on and configuration registry infrastructure.
- It sits on the boundary between app runtime behavior and reusable library code, so changes here can have wide impact.
- The package is TypeScript-based and built with `tsup`.

## Package Model

- Registry loading and add-on resolution behavior live under `src/addon-registry/`.
- Public exports matter here because consumers import specific helpers directly.
- Keep runtime behavior framework-light and avoid coupling this package to `packages/volto` internals unless absolutely necessary.

## Editing Rules

- TypeScript is mandatory for all new modules and features.
- Be careful with changes to loader generation, config merging, and module resolution. They affect startup behavior across the app.
- Preserve stable import surfaces when possible.
- When editing CLI or loader helpers, consider both Node execution and bundler integration.

## Validation

```sh
pnpm --filter @plone/registry test --run
pnpm --filter @plone/registry build
pnpm --filter @plone/registry check:ts
pnpm --filter @plone/registry check:exports
```
