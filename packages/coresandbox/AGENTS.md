# AGENTS.md

This file applies only to `packages/coresandbox` and its subdirectories.

## What This Package Is

- `@plone/volto-coresandbox` is a **CI fixture add-on** for Volto.
- It contains configuration and UI elements that are not present in vanilla Volto, used exclusively to support automated test coverage.
- It is part of the Volto CI infrastructure and is **not intended for production use**.

## Package Model

- Components and configuration here exist solely to enable test scenarios.
- This package is structured as a Volto add-on and loaded via `ADDONS=coresandbox` during test runs.

## Editing Rules

- **Do not add production logic here.** Any code added must serve a specific test coverage need.
- Before adding code, identify the test case that requires it and keep the fixture as minimal as possible.
- Do not refactor or extend this package for non-testing purposes.

## Validation

This package has no dedicated test or lint scripts. Its purpose is validated through the CI acceptance tests that load it as a fixture:

```sh
pnpm acceptance-test
```
