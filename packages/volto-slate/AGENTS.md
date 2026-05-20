# AGENTS.md

This file applies only to `packages/volto-slate` and its subdirectories.

## What This Package Is

- `@plone/volto-slate` implements the **Volto rich-text block editor** using the [Slate.js](https://www.slatejs.org/) framework.
- It is a core add-on of Volto, available since Volto 16 and released as a standalone package from Volto 18.
- It is present in this repository **for reference only** during Seven (Plone 7) development.
- It will be **superseded by `@plone/plate`** in the Seven context and will eventually be removed from this repo.

## Important Notice

> **Do not make significant changes to this package.**
>
> This package is reference code. The active Seven block editor is `@plone/plate`. If you need to fix a volto-slate issue, contribute upstream to the canonical Volto repository.

## For Reference

The source is organized as:

```
src/
  actions/      # Redux actions
  blocks/       # Block definitions and components
  editor/       # Slate editor core (plugins, elements, leaves)
  elementEditor/ # Element-level editor UI
  hooks/        # Custom React hooks
  reducers/     # Redux reducers
  widgets/      # Volto widget integrations
```

## Validation

If you must validate this package (reference use only):

```sh
# volto-slate has no dedicated test or build script in this repo
# Run acceptance tests via the parent Volto setup
pnpm acceptance-test
```
