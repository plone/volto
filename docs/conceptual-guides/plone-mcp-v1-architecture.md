---
myst:
  html_meta:
    "description": "Architecture specification for the Seven-hosted Plone MCP v1."
    "property=og:description": "Architecture specification for the Seven-hosted Plone MCP v1."
    "property=og:title": "Plone MCP v1 architecture"
    "keywords": "Seven, Plone, MCP, architecture, RR7, AI"
---

# Plone MCP v1 architecture

This document defines the implementation-ready v1 architecture for a Plone MCP interface in Seven.

The goal is to expose a site-bound MCP interface for AI-assisted content operations without turning RR7 into a second CMS API or a universal multi-site MCP service.

## Goals

- Expose a real MCP tool surface for Seven.
- Bind the MCP server to one Seven deployment and one Plone site context.
- Reuse the authenticated Seven user identity.
- Keep Plone as the canonical authority for content, permissions, and workflow.
- Support streaming conversations, approvals, and resumable sessions in RR7.
- Treat block editing as a first-class v1 workflow.

## Non-goals

- A universal MCP server for arbitrary Plone sites.
- Username/password configuration inside MCP clients.
- A one-to-one MCP mirror of `plone.restapi`.
- External MCP clients in v1.
- Detached background execution after browser auth expires.

## System boundary

V1 is a Seven-first architecture.

- Seven browser UI is the primary client.
- RR7 hosts the MCP server and the AI runtime.
- Plone remains the system of record for content and authorization.

RR7 adds:

- MCP transport and tool exposure
- model orchestration
- session lifecycle
- conversation persistence
- approval handling
- streaming to the browser
- block-registry exposure based on the effective Seven runtime registry

RR7 must not become a parallel replacement API for Plone.

## Trust model

Plone remains the authorization authority.

RR7 may decide which MCP capabilities are available in a session, but it never overrides Plone permissions.

Every Plone-backed tool call must satisfy both:

- RR7 MCP scope allows the operation.
- Plone authorizes the real user for the target object or action.

## Authentication and tokens

V1 uses a two-token model.

### Plone JWT

- Issued by Plone during normal Seven login.
- Stored by Seven in the signed `auth_seven` cookie.
- Used only by RR7, server-side, when calling `plone.restapi`.
- Never exposed to the model, browser JavaScript, or future external MCP clients.

### RR7 MCP session token

- Issued by RR7.
- Short-lived.
- Used only for MCP/session/runtime concerns inside RR7.
- Bound to one user, one site, one conversation, and one live MCP session.

Recommended claims:

- `iss`
- `aud = seven-mcp`
- `sub` as the Plone user id
- `sid` as the MCP session id
- `cid` as the conversation id
- `site`
- `scp`
- `iat`
- `exp`
- `jti`
- `ver`

## Delegated auth

V1 delegated auth is intentionally simple.

RR7 executes Plone-backed MCP tools using the currently authenticated user's existing Plone JWT, obtained server-side from the Seven session.

V1 explicitly does not use:

- service-user impersonation
- custom trusted user headers
- external token exchange flows

This preserves the cleanest security property: Plone authorizes requests as the real user.

## Session and conversation model

RR7 distinguishes between durable conversations and short-lived live MCP sessions.

### Conversations

Conversations are durable RR7 records.

They are:

- site-bound
- user-bound
- persisted independently of live auth lifetime

Conversations store:

- message history
- tool-call events
- approval events
- summaries
- affected content references

### MCP sessions

An MCP session is a short-lived live execution context bound to:

- one conversation
- one authenticated user
- one site
- one scope set

Recommended session states:

- `active`
- `waiting_for_approval`
- `reauth_required`
- `revoked`
- `expired`
- `closed`

Conversations can outlive many live MCP sessions over time.

## Persistence

Session persistence must be backend-configurable, but the semantics must remain the same across backends.

Recommended defaults:

- production: PostgreSQL
- development: SQLite
- test: in-memory or temporary SQLite

RR7 persistence should model these core entities:

- `conversations`
- `mcp_sessions`
- `conversation_events`
- `approvals`
- `conversation_summaries`

The storage layer is an RR7 concern, not a Plone concern.

## Auth expiry and recovery

When the underlying Plone authentication expires:

- the conversation remains available
- live MCP execution is suspended
- the MCP session transitions to `reauth_required`

After the user logs in again through Seven:

- RR7 creates a new live MCP session
- the new session is bound to the same conversation, user, and site
- the old session remains expired/replaced

Pending approvals from an expired session are invalidated and must be re-requested.

V1 does not rely on silent token refresh as a core requirement.

## V1 MCP exposure model

V1 focuses on Seven as the client.

- RR7 hosts the MCP server.
- Seven browser UI is the primary user-facing client.
- RR7 owns the conversation loop and browser-facing stream.
- External MCP clients are out of scope for v1.

The browser does not need to consume the MCP protocol directly.

Instead:

- the browser talks to RR7 chat/session endpoints
- RR7 runs the model/tool loop
- RR7 exposes the MCP tool surface internally in a real MCP-compatible form

This keeps auth and approvals under RR7 control while preserving a true MCP boundary.

## Turn lifecycle and streaming

RR7 owns the full turn lifecycle.

For one user turn:

1. The browser sends a chat turn to RR7.
2. RR7 validates the Seven session and the live MCP session.
3. RR7 builds model input from recent conversation state and summaries.
4. RR7 calls the model server-side with the available MCP tools.
5. RR7 streams structured turn events back to the browser.
6. RR7 executes read tools immediately.
7. RR7 pauses write tools on approval when required.
8. RR7 resumes the turn after approval.
9. RR7 persists all resulting events.

Recommended browser-facing stream events:

- `message.started`
- `message.delta`
- `message.completed`
- `tool.requested`
- `tool.running`
- `tool.completed`
- `tool.failed`
- `approval.requested`
- `approval.resolved`
- `auth.required`
- `turn.completed`
- `turn.failed`

Recommended browser-facing streaming transport in v1:

- SSE

## Approval model

Write tools are RR7-mediated interrupts, not direct blind executions.

Flow:

1. The model requests a mutating tool call.
2. RR7 validates session and scope.
3. RR7 normalizes and validates the request payload.
4. RR7 computes an approval preview.
5. RR7 stores an approval request and pauses execution.
6. Seven UI presents the approval request.
7. The user approves or denies.
8. RR7 executes the stored normalized payload only if approved.

Approval is always bound to the exact normalized request payload.

If the payload changes, approval must be requested again.

Recommended v1 policy:

- read tools do not require approval
- mutating tools require approval
- approved writes execute from stored payload, not regenerated model output

## Tool classification

The v1 tool set is intentionally split into two categories.

### MCP-native tools

These justify their existence because RR7 or Seven adds value that `plone.restapi` does not naturally provide.

- `site.get_context`
- `blocks.get_registry`
- `content.get_blocks`
- `content.update_blocks`

### Plone-backed primitive tools

These are minimal thin wrappers over canonical Plone behavior.

- `content.get`
- `content.search`
- `content.create`
- `content.update`
- `workflow.apply_transition`
- `schema.get_type`

RR7 must not expand this into a one-to-one MCP mirror of `plone.restapi`.

## V1 tool inventory

The implementation-ready v1 tool surface is:

- `site.get_context`
- `content.get`
- `content.search`
- `content.create`
- `content.update`
- `content.get_blocks`
- `content.update_blocks`
- `workflow.apply_transition`
- `schema.get_type`
- `blocks.get_registry`

Recommended approval policy:

- no approval:
  - `site.get_context`
  - `content.get`
  - `content.search`
  - `content.get_blocks`
  - `schema.get_type`
  - `blocks.get_registry`
- approval required:
  - `content.create`
  - `content.update`
  - `content.update_blocks`
  - `workflow.apply_transition`

## Blocks: source of truth and storage model

Block definitions and block storage are separate concerns.

### Effective registry is canonical for block definitions

The effective Seven runtime registry is the canonical source of truth for block definitions, including add-on extensions.

For block schemas, RR7 resolves block definitions from the effective runtime block registry.

In particular:

- `config.blocks.blocksConfig` is canonical
- `blockSchema` is the canonical block field contract
- if `blockSchema` is a function, RR7 resolves it in the effective runtime context

RR7 must not maintain a hand-authored parallel block schema catalog.

### Somersault is canonical for block storage shape

Somersault is not a block type.

It is the canonical storage envelope for how block content is stored and ordered.

RR7 models Somersault separately from block definitions.

This means block validation is split into two layers:

1. Validate the Somersault envelope as stored block-document structure.
2. Validate each block instance against its resolved registry-backed `blockSchema`.

## Block-related tools

### `blocks.get_registry`

This tool exposes the effective runtime block registry in an MCP-friendly form.

For each block type, RR7 should expose at least:

- block id
- title
- description if available
- resolved `blockSchema`
- defaults if available
- allowed/context flags if known

The schema format exposed by MCP should be JSON Schema, as provided by the effective runtime registry.

### `content.get_blocks`

This tool returns:

- a normalized Somersault payload for the item
- a summary useful for model reasoning

### `content.update_blocks`

V1 block updates are first-class, but intentionally conservative.

V1 supports:

- `operation = replace`

V1 does not support:

- arbitrary raw patch semantics
- generic block-level mutation verbs

Before approval, RR7 must:

1. validate the Somersault envelope
2. validate each block instance against its resolved block schema
3. perform integrity checks
4. compute a structural preview

The approval preview for block replacement should summarize:

- previous block count
- next block count
- added block types
- removed block types
- changed block types

## Error model

All tools should return a stable structured error envelope.

Recommended common error codes:

- `invalid_input`
- `not_found`
- `permission_denied`
- `approval_required`
- `approval_denied`
- `validation_error`
- `conflict`
- `backend_unavailable`
- `session_expired`

## V1 implementation boundary

The architecture is ready for implementation when treated with these boundaries:

- RR7 hosts the MCP and AI runtime.
- Seven browser UI is the only v1 client.
- Plone remains the canonical content and authorization API.
- RR7 persists conversations, sessions, approvals, and event streams.
- Write tools are approval-mediated.
- Block schemas come from the effective runtime registry.
- Somersault is modeled separately as the storage envelope.

## Future phases

Explicitly out of scope for v1, but compatible with this design:

- external MCP clients
- broader admin tools
- background detached execution
- richer block patch operations
- service-account-based delegated auth
