# AGENTS.md

This file applies only to `packages/types` and its subdirectories.

## What This Package Is

- `@plone/types` provides shared type definitions used across Volto packages.
- It is a foundational package. Small breaking changes here can cascade through the workspace.

## Editing Rules

- Prefer TypeScript for all new modules and features.
- Refactoring touched code toward TypeScript is welcome, but not required.
- Prefer additive changes over renames or removals.
- Keep type names and export paths stable unless the task explicitly requires a breaking change.
- When introducing new types, check whether they belong here or should remain package-local.

## Validation

```sh
pnpm --filter @plone/types check:ts
```
