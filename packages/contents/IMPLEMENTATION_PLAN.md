# `@plone/contents` Implementation Plan

This document tracks the work needed to bring `@plone/contents` to feature parity with Volto's folder contents view while keeping the Seven/RAC/granular architecture.

## Goals

- Reach behavioral parity with Volto contents for the main folder contents workflows.
- Preserve the current package direction: smaller RAC-based components with better shadowing seams than the legacy monolithic view.
- Refactor the current CSS-heavy styling toward `@plone/components` Quanta/Tailwind-native patterns after feature parity is in place.

## Working Rules

- Use Volto contents as the behavior reference.
- Use Figma as the visual reference once the relevant exports/screens are available.
- Complete behavior before the main Quanta styling refactor.
- Keep route logic, state management, and presentation separated.

## Phase 1: Feature Matrix And Current-State Audit

Status: `in_progress`

Deliverable:
- A checked parity matrix added to this document or a follow-up tracker.

### Parity Matrix

Legend:
- `done`: implemented and broadly aligned with Volto behavior
- `partial`: present but incomplete, provisional, or behaviorally different
- `missing`: not implemented yet

| Feature | Volto reference | `@plone/contents` status | Notes |
| --- | --- | --- | --- |
| Route registration and standalone contents layout | `Contents.jsx` route integration | `done` | Package route wiring exists and is package-local. |
| Loader-based listing of folder contents | `searchContent` usage in `Contents.jsx` | `partial` | Basic listing works, but query model is much narrower than Volto. |
| Breadcrumbs for contents navigation | `ContentsBreadcrumbs.jsx` | `partial` | Present, but needs parity review for multilingual/root behavior and final visual rules. |
| Display of content icon, title, expired/scheduled badges | `ContentsItem.jsx` | `partial` | Present in `ContentsCell`, but current implementation has API/type issues. |
| Row action popover with edit/view/cut/copy/delete/move actions | `ContentsItem.jsx` | `partial` | Present and granular, but needs permissions review and contract cleanup. |
| Add content entry point | top action area in `Contents.jsx` | `partial` | Present as `AddContentPopover`, but needs parity review against addable types behavior and Figma flow. |
| Search/filter input | `onChangeFilter` + `fetchContents` | `partial` | Debounced search exists, but only supports `SearchableText` and needs empty/no-results handling. |
| Pagination | `onChangePage` / `pageSize` logic | `partial` | Present, but page size parity and state handling are not aligned with Volto yet. |
| Column picker | `onSelectIndex` + popup in `Contents.jsx` | `partial` | Present, but persistence and some metadata details are incomplete. |
| Column ordering | `ContentsIndexHeader.jsx` drag-reorder | `missing` | Current package has index selection, not draggable column reordering. |
| Selection: single row | checkbox behavior in `ContentsItem.jsx` | `partial` | Context model exists, but exact UI/interaction parity still needs verification. |
| Selection: multi row | `selected` state in `Contents.jsx` | `partial` | Model exists, but needs parity validation and tests. |
| Selection: select all / select none | `onSelectAll` / `onSelectNone` | `missing` | Not clearly implemented in the current package surface. |
| Bulk actions toolbar | action toolbar in `Contents.jsx` | `partial` | Toolbar exists, but several actions are still placeholders. |
| Cut / copy selection | `cut` / `copy` in `Contents.jsx` | `partial` | Implemented via local storage clipboard, but lifecycle/error parity still incomplete. |
| Paste into current folder | `paste` in `Contents.jsx` | `partial` | Route exists and basic flow works, but target validation and post-paste lifecycle need work. |
| Delete selected items | `ContentsDeleteModal.jsx` + `deleteContent` | `partial` | Basic delete exists, but link integrity and richer partial failure handling are missing. |
| Upload modal | `ContentsUploadModal.jsx` | `missing` | Trigger exists as a placeholder only. |
| Rename modal | `ContentsRenameModal.jsx` | `missing` | Trigger exists as a placeholder only. |
| Workflow modal | `ContentsWorkflowModal.jsx` | `missing` | Trigger exists as a placeholder only. |
| Tags modal | `ContentsTagsModal.jsx` | `missing` | Trigger exists as a placeholder only. |
| Properties modal | `ContentsPropertiesModal.jsx` | `missing` | Trigger exists as a placeholder only. |
| Drag and drop item reorder | `react-dnd` item ordering in `Contents.jsx` / `ContentsItem.jsx` | `partial` | RAC drag-and-drop exists, but validation, loading, and final parity need work. |
| Move item to top / bottom | row menu actions in `ContentsItem.jsx` | `partial` | Present, but depends on the same ordering flow that still needs completion. |
| Rearrange / metadata sort UI | `onSortItems` + popup in `Contents.jsx` | `partial` | `RearrangePopover` exists, but the top-level handler is still a no-op. |
| Persisted sort state | `sort_on` / `sort_order` state in `Contents.jsx` | `missing` | Current loader always defaults to positional ordering. |
| Unauthorized handling | `Unauthorized` path in `Contents.jsx` | `missing` | Permission gating is commented out in the current package. |
| Empty state | contents view empty handling | `missing` | No dedicated empty-state UI yet. |
| No-results state | filtered search empty handling | `missing` | No dedicated no-results UI yet. |
| Mutation pending/loading UI | dimmers/loaders in Volto modals and table flows | `partial` | TODOs exist, but the package does not yet present strong pending feedback. |
| Success toasts | `Toast` usage in `Contents.jsx` | `partial` | Delete/paste/reorder toasts exist in places, but coverage and consistency are incomplete. |
| Error toasts | `Toast` usage in `Contents.jsx` | `partial` | Some error reporting exists, but not at Volto parity yet. |
| Link integrity warnings before delete | `ContentsDeleteModal.jsx` | `missing` | Explicitly absent in current package. |
| Tests for main contents flows | Volto has tests and snapshots | `missing` | `@plone/contents` currently has no tests. |

### Current Assessment

- The architectural rewrite is already an improvement over Volto’s monolithic `Contents.jsx` for Seven, RAC adoption, and shadowing.
- The current gap is mostly feature completeness and contract stability, not the overall package shape.
- The highest-risk missing areas are:
  - object action modals and their backend flows
  - select-all / full bulk interaction parity
  - sort/rearrange completion
  - permission/unauthorized and empty-state handling
  - link integrity parity for delete
  - package-local type/API cleanup

Tasks:
- [x] Enumerate all Volto contents features and mark each one as `done`, `partial`, or `missing` in `@plone/contents`.
- [ ] Capture the current UX states to support in Seven:
  - default listing
  - loading
  - empty
  - unauthorized
  - delete success and failure
  - paste success and failure
  - reorder success and failure
  - search results and no-results
  - mobile action layout
- [ ] Collect the relevant Figma exports/screens for:
  - main contents view desktop
  - main contents view mobile
  - row action popover
  - bulk actions toolbar
  - delete modal
  - rename/workflow/tags/properties/upload flows
  - rearrange/sort UI

Reference files:
- `packages/contents/routes/contents.tsx`
- `packages/contents/components/ContentsTable/ContentsTable.tsx`
- `packages/volto/src/components/manage/Contents/Contents.jsx`

## Phase 2: Behavioral Parity

Status: `todo`

### 2.1 Loader, Query, Pagination, Search

Tasks:
- [ ] Support Volto-equivalent search query parameters, not only `SearchableText` and `page`.
- [ ] Implement sort state in the loader query instead of always forcing `getObjPositionInParent`.
- [ ] Normalize pagination state and URL handling.
- [ ] Verify `b_start` and page index behavior matches current Seven pagination expectations.

Primary files:
- `packages/contents/routes/contents.tsx`
- `packages/contents/components/ContentsTable/ContentsTable.tsx`

### 2.2 Column Selection And Table Metadata

Tasks:
- [ ] Persist or at least consistently manage selected columns.
- [ ] Remove dead state such as `selectedCount` if unused, or wire it properly.
- [ ] Review unsupported columns such as `id` and define the intended contract instead of carrying it as a permanent special case.
- [ ] Ensure all labels use translated message ids instead of raw strings where appropriate.

Primary files:
- `packages/contents/types.ts`
- `packages/contents/components/Indexes.js`
- `packages/contents/components/TableIndexesPopover/TableIndexesPopover.tsx`
- `packages/contents/routes/contents.tsx`
- `packages/contents/components/ContentsTable/ContentsTable.tsx`

### 2.3 Selection And Bulk Actions

Tasks:
- [ ] Confirm single-row, multi-row, select-all, and clear-selection behavior matches Volto.
- [ ] Decide whether selection should survive pagination/search transitions.
- [ ] Ensure bulk actions only enable when the selected set is valid for the action.

Primary files:
- `packages/contents/providers/contents.tsx`
- `packages/contents/components/ContentsActions/ContentsActions.tsx`
- `packages/contents/components/ContentsTable/ContentsTable.tsx`

### 2.4 Clipboard: Cut / Copy / Paste

Tasks:
- [ ] Define the final clipboard contract and lifecycle.
- [ ] Clear or update clipboard state after successful paste where required.
- [ ] Handle invalid clipboard targets with explicit UI feedback.
- [ ] Verify cut vs copy semantics match Volto and Plone backend expectations.
- [ ] Decide whether clipboard should remain local-storage based or move to a higher-level utility.

Primary files:
- `packages/contents/components/ContentsTable/ContentsTable.tsx`
- `packages/contents/routes/paste.tsx`
- `packages/contents/config/constants.ts`

### 2.5 Delete Flow

Tasks:
- [ ] Keep the current modal flow but verify parity for single and bulk delete behavior.
- [ ] Confirm link integrity and related backend constraints are surfaced properly.
- [ ] Improve per-item error reporting for partial failures.
- [ ] Decide whether post-delete refresh should be explicit, optimistic, or fetcher-driven.

Primary files:
- `packages/contents/components/DeleteModal/DeleteModal.tsx`
- `packages/contents/routes/delete.tsx`
- `packages/contents/providers/contents.tsx`

### 2.6 Reorder And Rearrange

Tasks:
- [ ] Implement actual sort/rearrange behavior from `RearrangePopover`.
- [ ] Support reordering by position and sorting by metadata as Volto does.
- [ ] Clarify whether metadata sorting is persisted or just a view-level ordering.
- [ ] Finalize drag-and-drop behavior, including disabled cases and conflict states.
- [ ] Ensure move-to-top and move-to-bottom use the same contract as drag-and-drop.

Primary files:
- `packages/contents/components/RearrangePopover/RearrangePopover.tsx`
- `packages/contents/components/ContentsTable/ContentsTable.tsx`
- `packages/contents/routes/order.tsx`
- `packages/contents/routes/contents.tsx`

### 2.7 Object Actions: Upload, Rename, Workflow, Tags, Properties

Tasks:
- [ ] Replace the placeholder no-op handlers with real implementations.
- [ ] Decide whether these should be package-local modals, imported shared flows, or route-driven dialogs.
- [ ] Match Volto’s constraints for single-item vs multi-item actions.
- [ ] Ensure action completion refreshes table data and shows consistent toasts.

Primary files:
- `packages/contents/routes/contents.tsx`
- `packages/contents/components/ContentsActions/ContentsActions.tsx`
- `packages/contents/components/ContentsTable/ContentsTable.tsx`

Expected follow-up files:
- `packages/contents/components/RenameModal/*`
- `packages/contents/components/WorkflowModal/*`
- `packages/contents/components/TagsModal/*`
- `packages/contents/components/PropertiesModal/*`
- `packages/contents/components/UploadModal/*`

### 2.8 Row Actions And Navigation

Tasks:
- [ ] Verify all row actions match Volto behavior and permissions.
- [ ] Confirm folder rows open contents and item rows open view/edit correctly.
- [ ] Review whether the row action popover should expose additional actions.

Primary files:
- `packages/contents/components/ContentsCell/ContentsCell.tsx`
- `packages/contents/components/ItemActionsPopover/ItemActionsPopover.tsx`
- `packages/contents/components/AddContentPopover/AddContentPopover.tsx`

### 2.9 Permissions, Unauthorized, Error And Empty States

Tasks:
- [ ] Reintroduce or redesign the permission gating that is still commented out.
- [ ] Define the correct unauthorized experience for Seven.
- [ ] Add explicit empty-state and no-results-state rendering.
- [ ] Make loader/action errors deterministic and toast/error-boundary compatible.

Primary files:
- `packages/contents/routes/contents.tsx`
- `packages/contents/helpers/Errors.ts`
- `packages/contents/routes/delete.tsx`
- `packages/contents/routes/order.tsx`
- `packages/contents/routes/paste.tsx`
- `packages/contents/components/ContentsTable/ContentsTable.tsx`

## Phase 3: Technical Stabilization

Status: `todo`

### 3.1 TypeScript And API Contract Cleanup

Tasks:
- [ ] Fix contents-specific TypeScript errors before treating workspace-wide errors as blockers.
- [ ] Remove `any` from route payloads, clipboard, and toast helpers.
- [ ] Align imports with the current public APIs of `@plone/components`, `@plone/helpers`, and Quanta components.
- [ ] Fix component prop contract mismatches such as `ref`, `aria-describedby`, and table row typing.

Primary files:
- `packages/contents/helpers/Errors.ts`
- `packages/contents/types.ts`
- `packages/contents/components/ContentsCell/ContentsCell.tsx`
- `packages/contents/components/ItemActionsPopover/ItemActionsPopover.tsx`
- `packages/contents/components/ContentsTable/ContentsTable.tsx`
- `packages/contents/components/DeleteModal/DeleteModal.tsx`
- `packages/contents/components/AddContentPopover/AddContentPopover.tsx`

### 3.2 Data Refresh And Mutation UX

Tasks:
- [ ] Decide the reload strategy after mutations: fetcher-only, route revalidation, or local optimistic updates.
- [ ] Add pending/loading UI for delete, paste, and reorder actions.
- [ ] Prevent duplicate submissions while a mutation is in progress.

Primary files:
- `packages/contents/components/ContentsTable/ContentsTable.tsx`
- `packages/contents/components/DeleteModal/DeleteModal.tsx`
- `packages/contents/providers/contents.tsx`

### 3.3 Test Coverage

Tasks:
- [ ] Add the first package-local test suite. The package currently has no tests.
- [ ] Cover loader query generation.
- [ ] Cover selection and clipboard behavior.
- [ ] Cover delete and paste mutation payloads.
- [ ] Cover reorder payload generation and disabled states.
- [ ] Cover row rendering for title, date, workflow state, and actions.

Suggested test file targets:
- `packages/contents/routes/contents.test.ts`
- `packages/contents/components/ContentsTable/ContentsTable.test.tsx`
- `packages/contents/components/DeleteModal/DeleteModal.test.tsx`
- `packages/contents/components/ContentsCell/ContentsCell.test.tsx`
- `packages/contents/providers/contents.test.tsx`

## Phase 4: Quanta / Figma UI Refactor

Status: `todo`

This phase starts only after the main contents behaviors are complete.

Tasks:
- [ ] Review each package-local CSS file and classify it as:
  - removable
  - temporary gap-fill
  - should move into Quanta component APIs
- [ ] Replace bespoke CSS-driven layouts with Quanta/Tailwind composition where possible.
- [ ] Remove styling that duplicates existing `@plone/components` Quanta primitives.
- [ ] Align typography, spacing, colors, icon sizes, and states with the Figma designs.
- [ ] Validate desktop and mobile layouts against the design.
- [ ] Keep shadowing seams intact while reducing CSS surface area.

Primary files:
- `packages/contents/components/ContentsTable/ContentsTable.css`
- `packages/contents/components/ContentsActions/ContentsActions.css`
- `packages/contents/components/ItemActionsPopover/ItemActionsPopover.css`
- `packages/contents/components/RearrangePopover/RearrangePopover.css`
- `packages/contents/styles/main.css`
- all package component `.tsx` files that currently mix Quanta classes with CSS overrides

## Phase 5: Final Validation And Release Readiness

Status: `todo`

Tasks:
- [ ] Run targeted validation for the package:
  - `pnpm --filter @plone/contents test --run`
  - `pnpm --filter @plone/contents check-ts`
- [ ] Add Storybook stories for the main public states if this package is intended to expose them.
- [ ] Verify keyboard accessibility for:
  - table navigation
  - selection
  - popovers
  - dialogs
  - drag and drop
- [ ] Validate responsive behavior on mobile/tablet.
- [ ] Review whether any behavior should move into shared Seven or `@plone/components` abstractions.

## Proposed PR Split

### PR 1: Behavioral parity

Scope:
- route/query completion
- clipboard/delete/reorder stabilization
- object action implementation
- permissions and state handling

### PR 2: Type safety and tests

Scope:
- contents-specific TypeScript cleanup
- test coverage for the critical flows
- mutation/revalidation cleanup

### PR 3: Quanta/Figma refactor

Scope:
- reduce/remove package-local CSS
- align visuals with Quanta and Figma
- polish responsive and accessibility details

## Prioritized Backlog

This section turns the parity matrix into execution order.

### P0: Make The Core View Complete And Trustworthy

These items unblock real usage of the package and should land first.

1. Selection parity
   Status: `partial`
   Why first:
   Bulk actions are central to contents. Several later features depend on reliable selected-item state.
   Tasks:
   - [ ] Implement explicit select-all and clear-selection behavior.
   - [ ] Verify row selection behavior on desktop and mobile.
   - [ ] Decide and document whether selection survives search/pagination changes.
   Primary files:
   - `packages/contents/providers/contents.tsx`
   - `packages/contents/components/ContentsTable/ContentsTable.tsx`
   - `packages/contents/components/ContentsActions/ContentsActions.tsx`

2. Rearrange and sort completion
   Status: `partial`
   Why first:
   The current UI exposes rearrange affordances, but the main sort handler is still a no-op.
   Tasks:
   - [ ] Wire `RearrangePopover` to real sort state.
   - [ ] Pass `sort_on` and `sort_order` through loader URL/query handling.
   - [ ] Reconcile drag reorder with metadata sorting mode.
   - [ ] Define the UX when manual ordering is not the active sort.
   Primary files:
   - `packages/contents/routes/contents.tsx`
   - `packages/contents/components/RearrangePopover/RearrangePopover.tsx`
   - `packages/contents/components/ContentsTable/ContentsTable.tsx`
   - `packages/contents/routes/order.tsx`

3. Delete flow parity
   Status: `partial`
   Why first:
   Delete is already present, so closing the parity gap here is cheaper than building a new feature from scratch later.
   Tasks:
   - [ ] Improve partial-failure handling and post-delete refresh behavior.
   - [ ] Add the missing empty-state transition after last-item delete.
   - [ ] Decide whether link integrity parity belongs in this PR or a follow-up.
   Primary files:
   - `packages/contents/components/DeleteModal/DeleteModal.tsx`
   - `packages/contents/routes/delete.tsx`
   - `packages/contents/components/ContentsTable/ContentsTable.tsx`

4. Clipboard lifecycle completion
   Status: `partial`
   Why first:
   Cut/copy/paste already exists and is close enough that finishing it gives immediate user value.
   Tasks:
   - [ ] Define when clipboard is cleared after paste.
   - [ ] Handle invalid paste targets and stale clipboard content cleanly.
   - [ ] Ensure cut vs copy feedback is consistent and accurate.
   Primary files:
   - `packages/contents/components/ContentsTable/ContentsTable.tsx`
   - `packages/contents/routes/paste.tsx`

### P1: Implement The Missing Action Flows

These are the largest remaining feature gaps.

5. Rename modal and action
   Status: `missing`
   Dependencies:
   - reliable selection model
   Tasks:
   - [ ] Create package-local rename modal flow.
   - [ ] Support single and multi-item rename semantics.
   - [ ] Refresh data and show completion/error feedback.
   Expected files:
   - `packages/contents/components/RenameModal/*`
   - `packages/contents/routes/contents.tsx`
   - `packages/contents/components/ContentsActions/ContentsActions.tsx`

6. Workflow modal and action
   Status: `missing`
   Dependencies:
   - reliable selection model
   Tasks:
   - [ ] Build workflow transition discovery and submission flow.
   - [ ] Support recursive workflow changes where applicable.
   - [ ] Match Volto constraints for mixed selections.
   Expected files:
   - `packages/contents/components/WorkflowModal/*`
   - `packages/contents/routes/contents.tsx`
   - related route/action helpers if needed

7. Tags modal and action
   Status: `missing`
   Dependencies:
   - reliable selection model
   Tasks:
   - [ ] Implement add/remove tags flow for one or more items.
   - [ ] Decide whether vocabulary fetching is package-local or shared.
   Expected files:
   - `packages/contents/components/TagsModal/*`
   - `packages/contents/routes/contents.tsx`

8. Properties modal and action
   Status: `missing`
   Dependencies:
   - reliable selection model
   Tasks:
   - [ ] Implement effective/expires/rights/creators/exclude-from-nav editing.
   - [ ] Handle mixed-value initial state for multi-selection.
   Expected files:
   - `packages/contents/components/PropertiesModal/*`
   - `packages/contents/routes/contents.tsx`

9. Upload modal and action
   Status: `missing`
   Dependencies:
   - none beyond base route integration
   Tasks:
   - [ ] Define Seven-native upload UX.
   - [ ] Support file/image uploads with progress and cancellation behavior.
   - [ ] Refresh contents and preserve expected page/filter state after upload.
   Expected files:
   - `packages/contents/components/UploadModal/*`
   - `packages/contents/routes/contents.tsx`

### P2: Complete The Missing View States

These close the usability gaps around permissions and discoverability.

10. Unauthorized and permission gating
    Status: `missing`
    Dependencies:
    - clearer action contract
    Tasks:
    - [ ] Reintroduce folder-contents permission checks.
    - [ ] Define Seven-native unauthorized behavior.
    - [ ] Hide or disable actions the user cannot perform.
    Primary files:
    - `packages/contents/routes/contents.tsx`
    - `packages/contents/components/ContentsTable/ContentsTable.tsx`
    - `packages/contents/components/ItemActionsPopover/ItemActionsPopover.tsx`
    - `packages/contents/components/ContentsActions/ContentsActions.tsx`

11. Empty and no-results states
    Status: `missing`
    Dependencies:
    - loader/search stabilization
    Tasks:
    - [ ] Add explicit empty-state UI when the folder has no items.
    - [ ] Add explicit no-results UI when filtering returns no matches.
    - [ ] Ensure action affordances differ correctly between empty and filtered-empty states.
    Primary files:
    - `packages/contents/components/ContentsTable/ContentsTable.tsx`

12. Loading and pending states
    Status: `partial`
    Dependencies:
    - mutation contract stabilization
    Tasks:
    - [ ] Show pending UI for delete, paste, reorder, and action modal submissions.
    - [ ] Prevent duplicate submissions during pending states.
    - [ ] Decide how much optimistic updating is desirable for Seven.
    Primary files:
    - `packages/contents/components/ContentsTable/ContentsTable.tsx`
    - `packages/contents/components/DeleteModal/DeleteModal.tsx`
    - future action modal components

### P3: Stabilize The Package Contract

These tasks reduce churn before the Quanta/Figma pass.

13. TypeScript and API cleanup
    Status: `partial`
    Why here:
    It should not block every feature PR, but it should be completed before visual refactor.
    Tasks:
    - [ ] Fix contents-local type/API issues.
    - [ ] Remove `any` from core package contracts.
    - [ ] Align with current public exports of helper and component packages.

14. Test coverage
    Status: `missing`
    Why here:
    Once P0 and P1 settle, tests become much less throwaway.
    Tasks:
    - [ ] Add first package-local tests for loader, selection, clipboard, delete, reorder, and cell rendering.

### P4: Quanta / Figma Refactor

15. Replace transitional CSS styling
    Status: `todo`
    Dependencies:
    - behavioral parity
    - package contract stabilization
    - Figma exports/screens
    Tasks:
    - [ ] Reduce package-local CSS to the minimum necessary.
    - [ ] Move styling decisions into Quanta/Tailwind-native composition where possible.
    - [ ] Validate against Figma on desktop and mobile.

## Recommended Execution Order

If this is implemented incrementally, I would follow this sequence:

1. Selection parity
2. Rearrange and sort completion
3. Delete and clipboard completion
4. Rename
5. Workflow
6. Tags
7. Properties
8. Upload
9. Unauthorized and empty/no-results states
10. Type/API cleanup
11. Tests
12. Quanta/Figma refactor

## Suggested PR Mapping

### PR A: Core table parity

Include:
- selection parity
- rearrange/sort completion
- delete flow completion
- clipboard completion
- empty/no-results basics if cheap

### PR B: Action flows

Include:
- rename
- workflow
- tags
- properties
- upload

### PR C: Hardening

Include:
- unauthorized/permission gating
- pending/loading polish
- contents-local type/API cleanup
- initial tests

### PR D: Quanta/Figma pass

Include:
- style refactor
- responsive tuning
- accessibility polish

## Immediate Next Steps

- [x] Fill in the feature parity matrix from Volto.
- [ ] Decide the implementation strategy for upload/rename/workflow/tags/properties.
- [ ] Decide the route/query model for rearrange and metadata sorting.
- [ ] Decide whether link integrity delete warnings are in scope for parity v1 or follow-up parity.
- [ ] Gather the Figma exports for the key flows before starting the Quanta refactor.
