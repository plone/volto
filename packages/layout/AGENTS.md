# AGENTS.md

This file applies only to `packages/layout` and its subdirectories.

## What This Package Is

- `@plone/layout` provides **shared structural layout elements** for Seven.
- It is consumed by both `@plone/cmsui` (editor UI) and `@plone/publicui` (public-facing pages).
- It contains: page header, footer, breadcrumbs, block renderer (`RenderBlocks`, `SomersaultRenderer`, `BlockWrapper`, `DefaultBlockView`), toast notifications, and slot configuration.

## Package Model

- **Blocks rendering** (`blocks/`): `RenderBlocks` and `SomersaultRenderer` orchestrate how blocks are rendered on a page. `BlockWrapper` wraps individual blocks.
- **Components** (`components/`): structural UI elements (header, footer, breadcrumbs, toast).
- **Config** (`config/`): slot definitions (`slots.ts`), toast config (`toast.ts`), and layout settings (`settings.ts`).
- **Styles** (`styles/`): CSS for each layout section, organized by zone (`header.css`, `footer.css`, `content-area.css`, `publicui.css`).
- Storybook is configured under `.storybook/`.

## Editing Rules

- Do not add **app-specific or CMS-specific logic** here. Layout components must work equally in both `cmsui` and `publicui` contexts.
- Keep block renderer logic in `blocks/` — do not spread rendering concerns into component files.
- When adding a new layout zone or structural component, add a corresponding CSS file in `styles/`.
- Write Storybook stories for new visual components.
- Do not add data-fetching logic here; layout components receive data via props or slots.

## Validation

```sh
pnpm --filter @plone/layout test --run
pnpm --filter @plone/layout check:ts
```

For Storybook:

```sh
pnpm --filter @plone/layout storybook
```
