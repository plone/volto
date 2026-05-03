# AGENTS.md

This file applies only to `packages/mcp` and its subdirectories.

## What This Package Is

- `@plone/mcp` is the Seven add-on that provides MCP-oriented AI runtime capabilities for Plone.
- It owns MCP session bootstrap, approvals, conversations, MCP-backed tools, and the first MCP UI routes such as `@@mcp` and `@@mcp-chat`.
- It is an add-on package, not a bundled library package.

## Package Model

- Root `index.ts` is the add-on entry that registers routes.
- Root `*.server.ts` files contain server-only MCP runtime helpers and must stay server-only.
- `types.ts` contains shared MCP domain types.
- `routes/` contains route modules for MCP pages and MCP HTTP endpoints.
- `acceptance/tests/` contains Playwright acceptance coverage for the MCP UI routes.

## Editing Rules

- Do not introduce a `src/` barrel layer for this package.
- Keep server-only code in root `*.server.ts` files and import it explicitly with the `.server` suffix.
- Do not leak Node-only modules into browser-facing route code.
- Keep route registration in `index.ts`; do not scatter add-on route wiring into helper files.
- When adding new MCP tools, prefer explicit server helpers over generic passthrough abstractions.

## Validation

```sh
pnpm --filter @plone/mcp test --run
pnpm --filter @plone/mcp check:ts
pnpm exec playwright test packages/mcp/acceptance/tests/mcp-chat.test.ts --config=playwright.config.ts --project=chromium --reporter=line
```
