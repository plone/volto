# AGENTS.md

This file applies only to `packages/publicui` and its subdirectories.

## What This Package Is

- `@plone/publicui` provides the **public-facing routes and page rendering for Seven**.
- It is the surface that anonymous visitors and authenticated users see when browsing the site.
- It covers content views, search results, and the sitemap.
- It consumes `@plone/layout` for structural page elements and `@plone/blocks` for block rendering.

> [!WARNING]
> This package is experimental. Breaking changes may occur without notice.

## Package Model

- **Routes** (`routes/`) define the public URL surface:
  - `content.tsx` — renders a content item by resolving its blocks through `@plone/layout`'s `RenderBlocks`
  - `search.tsx` — search results page
  - `sitemap.tsx` — sitemap view
  - `index.tsx` — route index / layout wrapper
  - `layers.css.tsx` — CSS layer declarations injected via React
- **Styles** (`styles/publicui.css`) — public-facing page styles.

## Editing Rules

- Route components should stay **thin**: resolve data from the REST API (via `@plone/client`) and delegate rendering to `@plone/layout` and `@plone/blocks`.
- Do not add editor or admin UI here — that belongs in `@plone/cmsui`.
- When adding a new public route, register it in `routes/index.tsx`.
- Keep CSS in `styles/` — do not inline significant styles into route components.

## Validation

```sh
pnpm --filter @plone/publicui test --run
pnpm --filter @plone/publicui check-ts
```
