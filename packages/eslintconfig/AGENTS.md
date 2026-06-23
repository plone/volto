# AGENTS.md

This file applies only to `packages/eslintconfig` and its subdirectories.

## What This Package Is

- `packages/eslintconfig` is a private workspace package used to hold shared ESLint configuration state for the monorepo.
- It is support infrastructure, not a publishable app or library.

## Editing Rules

- Prefer TypeScript-aware configuration for new modules and features when the change introduces new linted code paths.
- Keep changes minimal and justified by a repo-wide linting need.
- Any rule change here can affect multiple packages, so validate the impacted packages instead of changing rules blindly.

## Validation

Use the lint command for the package or packages affected by the configuration change.
