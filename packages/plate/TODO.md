# Comments And Suggestions Integration Notes

This note documents the current integration model for comments and suggestions in `@plone/plate`, why it was changed, and how a host app such as Seven should consume it.

## Summary

Comments and suggestions no longer rely on hardcoded demo data inside `@plone/plate`.

The library now expects the host app to provide:

- `currentUser`
- `currentUserId`
- `users`
- `discussions`
- `setUsers`
- `setDiscussions`

These values are exposed through [components/editor/plate-plugins-context.tsx](./components/editor/plate-plugins-context.tsx) and consumed with `usePlatePlugins()`.

## What Changed

### 1. Shared app-owned state

`@plone/plate` now exposes a lightweight context:

- [components/editor/plate-plugins-context.tsx](./components/editor/plate-plugins-context.tsx)

This context is the app boundary for discussion/suggestion state. The editor package owns rendering and editor behavior, but the host app owns the actual data and current user.

### 2. Comments use React context directly

Comment flows were migrated fully to React-side data access.

Relevant files:

- [components/ui/comment.tsx](./components/ui/comment.tsx)
- [components/ui/block-discussion.tsx](./components/ui/block-discussion.tsx)
- [components/editor/use-chat.ts](./components/editor/use-chat.ts)

Comment creation/update/resolve/remove now reads `currentUserId`, `users`, and `discussions` from `usePlatePlugins()`. Because of that, comments no longer need a bridge or sync step into plugin state.

### 3. Suggestions use the same data source for display

Suggestion rendering and discussion lookup also use the same context.

Relevant files:

- [components/ui/block-suggestion.tsx](./components/ui/block-suggestion.tsx)
- [components/ui/block-discussion.tsx](./components/ui/suggestion-node.tsx)

Suggestion cards resolve author info from `users` in the shared context, and suggestion comments come from `discussions`.

### 4. Suggestion creation still depends on plugin state

Suggestion creation/edit behavior still lives in low-level editor transform overrides:

- [components/editor/plugins/suggestion-core.ts](./components/editor/plugins/suggestion-core.ts)

This file intercepts typing, deletion, insertion, breaks, fragments, etc. It still needs `currentUserId` when the editor operation happens so it can:

- stamp new suggestion nodes with `userId`
- decide whether an existing suggestion belongs to the current user
- merge follow-up edits into the same suggestion when appropriate

Because this code is not React, it cannot call `usePlatePlugins()`.

## Current Model

The current compromise is:

- Comments: fully React/context-driven
- Suggestion display: React/context-driven
- Suggestion transform ownership: plugin-option-driven

The relevant suggestion option is `currentUserId` on `SuggestionPlugin`.

That option is not synced continuously anymore. Instead, it is set at the UI entry points that enable suggestion mode:

- [components/ui/suggestion-toolbar-button.tsx](./components/ui/suggestion-toolbar-button.tsx)
- [components/ui/mode-toolbar-button.tsx](./components/ui/mode-toolbar-button.tsx)

So the flow is now:

1. Host app provides `currentUserId` via `PlatePluginsProvider`.
2. Suggestion mode is enabled from UI.
3. The UI writes `currentUserId` into `SuggestionPlugin` options.
4. `suggestion-core.ts` reads that option while handling editor transforms.

This removed the explicit sync component while keeping suggestion creation working.

## How A Host App Should Consume `@plone/plate`

The host app should wrap the editor and renderer with `PlatePluginsProvider` from `@plone/plate` and provide a value object with:

- `currentUser`
- `currentUserId`
- `users`
- `discussions`
- `setUsers`
- `setDiscussions`

Minimum requirements:

- `discussions` should include both comment threads and suggestion discussion threads.
- `users` should be keyed by user id.
- `currentUserId` should be stable for the logged-in editor session.

Example shape:

```ts
{
  currentUser: { id: 'admin', name: 'Admin' },
  currentUserId: 'admin',
  discussions: [],
  setDiscussions,
  setUsers,
  users: {
    admin: { id: 'admin', name: 'Admin' },
  },
}
```

## What Volto-Plate Does

`volto-plate` currently provides the app-side adapter.

Relevant files:

- [../packages/volto-plate/src/plate/context/PlatePluginsProvider.tsx](../packages/volto-plate/src/plate/context/PlatePluginsProvider.tsx)
- [../packages/volto-plate/src/plate/discussion-data.ts](../packages/volto-plate/src/plate/discussion-data.ts)
- [../packages/volto-plate/src/components/PlateEditorForm/PlateEditorForm.tsx](../packages/volto-plate/src/components/PlateEditorForm/PlateEditorForm.tsx)
- [../packages/volto-plate/src/components/PlateEditorRenderer/PlateEditorRenderer.tsx](../packages/volto-plate/src/components/PlateEditorRenderer/PlateEditorRenderer.tsx)

That adapter:

- derives `currentUser` from the JWT token
- normalizes persisted `users` and `discussions`
- injects them into `@plone/plate`
- persists updated discussions back into the somersault block

## What Seven Needs

If Seven wants to consume comments/suggestions in the same way, it should provide the same provider contract around the Plate editor:

- get the current user from the Seven session/app state
- normalize stored user/discussion data into the `@plone/plate` shape
- provide `setDiscussions` and `setUsers`
- persist updated discussion data in the app-specific storage layer

The important point is:

- `@plone/plate` is no longer the source of truth for users/discussions
- Seven (or any host app) must be the source of truth

## Remaining Architectural Gap

Suggestions are still not as clean as comments.

Comments work entirely from React context because comment creation happens in React components.

Suggestions still need `currentUserId` in plugin state because suggestion creation is implemented inside `suggestion-core.ts` transform overrides.

If we want full parity with comments later, the deeper refactor would be:

- move user-dependent suggestion creation/ownership logic out of `suggestion-core.ts`
- keep `suggestion-core.ts` generic
- let React-level commands provide user information directly

That is not required for current usage, but it is the next cleanup direction if we want suggestions to match the comment model completely.
