# AGENTS.md

This file applies only to `packages/tooling` and its subdirectories.

## What This Package Is

- `@plone/tooling` provides **shared Playwright test harness and ESLint devDependencies** for Seven packages.
- It houses the shared Playwright fixtures, test utilities, and launcher scripts used across packages that run acceptance tests.
- It also provides ESLint as a shared devDependency so packages do not need to manage it individually.

> [!WARNING]
> This package is experimental. Breaking changes may occur without notice.

## Package Model

- **`playwright/`** — shared Playwright fixtures (`content.ts`, `login.ts`, `plate.ts`, `reset-fixture.ts`, `test.ts`) and test helpers.
- **`stories/`** — shared Storybook stories or story utilities.
- **`tsconfig.json`** — TypeScript config for the tooling package itself.
- No `src/` directory — this package contains tooling artifacts, not compiled library code.

## Editing Rules

- Add here only **tooling artifacts**: Playwright fixtures, ESLint configs, shared test utilities.
- Do not add production UI components or runtime library code.
- When modifying Playwright fixtures, verify they still work for all packages that import from `@plone/tooling`:
  - `@plone/cmsui`, `@plone/contents`, `@plone/layout`, `@plone/plate`, `@plone/blocks`
- Storybook for all packages can be launched from here:

  ```sh
  pnpm --filter @plone/tooling storybook:components
  pnpm --filter @plone/tooling storybook:cmsui
  pnpm --filter @plone/tooling storybook:layout
  # etc.
  ```

## Validation

Tooling is validated indirectly through the acceptance tests that consume it:

```sh
pnpm acceptance-test
```
