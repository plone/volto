# AGENTS.md

This file applies only to `packages/volto` and its subdirectories.

## What This Package Is

- `@plone/volto` is the **stable Plone 6 frontend** — a React-based CMS frontend that powers Plone 6 sites worldwide.
- It is present in this repository **for reference only** during Seven (Plone 7) development.
- It will be **deleted from this repo** once it is no longer useful for Seven development.

## Important Notice

> **Do not make significant changes to this package.**
>
> This package is not part of the Seven stack. It is a read-only reference. If you need to fix a Volto issue, contribute upstream to the canonical Volto repository.

## For Reference

Volto uses a different toolchain from the Seven packages:

- Build: Razzle (not Vite)
- Test: Jest (not Vitest)
- CSS: Less/Semantic UI (not Tailwind/CSS modules)

These differences are intentional — Volto and Seven are separate stacks.

## Validation

If you must validate Volto in isolation (reference use only):

```sh
pnpm --filter @plone/volto test:ci
pnpm --filter @plone/volto lint
```
