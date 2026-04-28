# AGENTS.md

This file applies only to `packages/plate` and its subdirectories.

## What This Package Is

- `@plone/plate` is the **block editor for Seven**, built on [Plate.js](https://platejs.org/).
- It will eventually **replace `@plone/volto-slate`** in the Seven context.
- It is consumed by `@plone/cmsui` to power the `add` and `edit` routes, and uses Edit components from `@plone/blocks` for individual block types.
- Block migration utilities live under `migrations/`.

> [!WARNING]
> This package is experimental. Breaking changes may occur without notice.

## Package Model

- **Presets** (`config/presets/`) define composed editor configurations for different use cases:
  - `block-editor` — full editing preset for the CMS UI
  - `somersault-editor` / `somersault-renderer` — presets for the Somersault rendering pipeline
  - `block-renderer` — read-only block rendering preset
  - `full` — the most feature-complete preset
- **Components** (`components/`) contain Plate UI elements (nodes, resize handles, etc.) — follow Plate.js conventions for node and leaf components.
- **Migrations** (`migrations/`) handle data transformation from old block formats.
- Storybook is configured under `.storybook/`.

## Editing Rules

- When changing editor behavior, prefer adding or modifying a **preset** rather than changing core rendering logic.
- Follow Plate.js plugin and component conventions when adding new editor features.
- If a block needs both an edit and a view component, the edit component lives in `@plone/blocks`; the renderer preset wires it up here.
- Write migration tests for any data format changes.

## Validation

```sh
pnpm --filter @plone/plate test --run
pnpm --filter @plone/plate check-ts
```

For Storybook:

```sh
pnpm --filter @plone/plate storybook
```
