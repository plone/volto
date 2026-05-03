# AGENTS.md

This file applies only to `packages/volto-slate` and its subdirectories.

## What This Package Is

- `@plone/volto-slate` provides the Slate-based editor integration used by Volto.
- It is tightly coupled to Volto editor behavior even though it is versioned as a separate package.

## Editing Rules

- Prefer TypeScript for all new modules and features.
- Refactoring touched code toward TypeScript is welcome, but not required.
- Treat changes here as editor-platform changes, not isolated component tweaks.
- Preserve serialization, deserialization, and editor schema expectations.
- When changing editor behavior, check whether fixtures, Cypress flows, or Volto-side block/editor integrations also need updates.
- Avoid introducing APIs that bypass existing Volto editor configuration patterns unless the task explicitly calls for it.

## Validation

This package does not expose a dedicated local test script in this branch.
Validate through Volto:

```sh
pnpm --filter @plone/volto test --run
pnpm --filter @plone/volto build
make ci-acceptance-test-run-all
```
