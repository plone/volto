# AGENTS.md

This file applies only to `packages/blocks` and its subdirectories.

## What This Package Is

- `@plone/blocks` provides the **core content blocks for Seven** (Plone 7).
- It is **not part of Volto** and not used by it.
- Each block serves two consumers:
  - **Edit components** → consumed by `@plone/plate` (the Seven block editor)
  - **View components** → consumed by `@plone/publicui` (the public-facing renderer)

> [!WARNING]
> This package is experimental. Breaking changes may occur without notice.

## Block Structure

Each block lives in its own folder at the package root (e.g., `Video/`, `Image/`, `Teaser/`, `Listing/`):

```
<BlockName>/
  <BlockName>BlockView.tsx   # View variant — used by publicui
  <BlockName>BlockEdit.tsx   # Edit variant — used by plate
  schema.tsx                 # Block schema definition
  index.ts                   # Re-exports
```

- View and Edit components are co-located in the same folder.
- The `index.ts` should export both variants so consumers can import what they need.

## Package Model

- Keep blocks **self-contained**. Avoid cross-block dependencies.
- Blocks receive their data via props; they do not fetch data independently.
- The schema file defines the block's configuration fields for the editor UI.
- Do not add routing, global state, or provider dependencies directly inside block components.

## Editing Rules

- When adding a new block, create the full folder structure: View, Edit, schema, and index.
- Make sure both Edit and View variants are exported from the block's `index.ts`.
- Write tests for non-trivial rendering logic.
- Keep CSS colocated with the component that uses it.

## Validation

```sh
pnpm --filter @plone/blocks test --run
pnpm --filter @plone/blocks check:ts
```
