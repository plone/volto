# AGENTS.md

This file applies only to `packages/cmsui` and its subdirectories.

## What This Package Is

- `@plone/cmsui` is the **full editing and administration UI for Seven** (Plone 7).
- It is the interface that content editors use to create, edit, and manage content.
- It contains routes, widgets, forms, a sidebar, and control panels.
- The block editor inside `add` and `edit` routes is powered by `@plone/plate`.

> [!WARNING]
> This package is experimental. Breaking changes may occur without notice.

## Package Model

- **Routes** are declared in `config/routes.ts`.
- **Widgets** (form input components) are registered in `config/widgets.ts`.
- **Control panels** configuration lives in `config/controlpanels.ts`.
- **Components** are organized under `components/<ComponentName>/`.
- The **Contents route** (`/contents`) is **not** managed here — it lives in `@plone/contents` because of its complexity. Do not move Contents UI into this package.
- Styles live under `styles/`.
- Storybook is configured under `.storybook/`.

## Editing Rules

- Every new UI component should have a Storybook story.
- Keep route, widget, and control panel registrations in their respective config files — do not scatter them across component files.
- Do not re-implement block editing UI here; defer to `@plone/plate` for all rich-text and block editing interactions.
- Keep components scoped to admin/editing concerns. Public-facing rendering belongs in `@plone/publicui` or `@plone/layout`.

## Validation

```sh
pnpm --filter @plone/cmsui test --run
pnpm --filter @plone/cmsui check-ts
```

For Storybook:

```sh
pnpm --filter @plone/cmsui storybook
```
