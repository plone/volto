# AGENTS.md

This file applies only to `packages/coresandbox` and its subdirectories.

## What This Package Is

- `@plone/volto-coresandbox` is a development add-on used to exercise Volto core features that are not enabled in the default app.
- Treat it as fixture and integration scaffolding for Volto core work, not as a general-purpose library.

## Editing Rules

- Prefer TypeScript for all new modules and features.
- Keep this package aligned with the add-on conventions used by Volto.
- Changes here usually need corresponding checks in `packages/volto`, especially for runtime integration and acceptance coverage.
- Do not add broad dependencies or tooling here unless they are required for sandbox scenarios.

## Validation

There is no dedicated package script set here. Validate through Volto commands that load the sandbox:

```sh
pnpm --filter @plone/volto start:coresandbox
make coresandbox-ci-acceptance-test-run-all
```
