# AGENTS.md

This file applies only to `packages/scripts` and its subdirectories.

## What This Package Is

- `@plone/scripts` is a collection of **Node.js automation scripts** used in Volto and Seven development workflows.
- Scripts cover: i18n message extraction, release management, PR tooling, pnpm lock hook, VS Code settings, and changelog automation.
- This is **not a React package** — it contains plain Node.js scripts.

## Package Model

Key scripts:

| Script | Purpose |
|---|---|
| `preleaser.js` | Pre-release automation |
| `finalreleasechangelog.py` | Changelog finalization |
| `corepackagebump.js` | Bumps core package versions |
| `backportpr.js` | Backport PR tooling |
| `lockhook.js` | pnpm lock file hook |
| `vscodesettings.js` | Generates VS Code settings |
| `prepublish.js` | Pre-publish checks |

Templates for add-on scaffolding live in `templates/`.

## Editing Rules

- Scripts here must work with Node.js directly — no transpilation step.
- Keep scripts focused and single-purpose.
- Do not add React or frontend UI code here.

## Validation

This package has no dedicated test script. Validate by running the relevant script manually:

```sh
node packages/scripts/<script-name>.js
```
