# AGENTS.md

This file applies only to `packages/theming` and its subdirectories.

## What This Package Is

- `@plone/theming` provides the **CSS foundations for Seven theming**.
- It defines the core design tokens and primitives that other packages and themes build on:
  - CSS custom properties for colors (`styles/colors.css`)
  - Typography scale (`styles/typography.css`)
  - Core theme variables (`styles/theme.css`)
  - Tailwind integration layer (`styles/tailwind.css`)
  - Shared utility classes (`styles/utilities.css`)
  - Simple/base styles (`styles/simple/`)
- It is consumed by `@plone/agave` (the example theme) and can be consumed by any custom theme.

> [!WARNING]
> This package is experimental. Breaking changes may occur without notice.

## Package Model

- All theming primitives are exposed as **CSS custom properties** (CSS variables) so they can be overridden at any scope.
- Changes here affect every package and theme that imports from `@plone/theming`.
- The `styles/simple/` folder provides baseline reset and component styles for plain/unstyled contexts.

## Editing Rules

- Changes to token names or values here are **breaking changes** — update all consuming packages accordingly.
- Do not add JavaScript or TypeScript code to this package unless absolutely necessary; keep it CSS-first.
- When adding a new token, add it to the appropriate CSS file and ensure it is available in the Tailwind layer if applicable.

## Validation

This package has no dedicated test script.

For repo-wide CSS linting:

```sh
pnpm stylelint
```
