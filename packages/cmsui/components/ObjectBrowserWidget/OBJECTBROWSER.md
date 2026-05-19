# ObjectBrowserWidget — cmsui (seven) vs Volto Core Comparison

---

# Part 1 — cmsui (seven) Implementation

## Architecture Overview

The widget is a multi-layer composition of providers, context, and presentational components. All state lives in `ObjectBrowserContext`, provided by `ObjectBrowserProvider`.

```
ObjectBrowserWidget                   [ObjectBrowserWidget.tsx]
  └── ObjectBrowserProvider           [ObjectBrowserContext.tsx]
        ├── ObjectBrowserNavigationProvider   [ObjectBrowserNavigationContext.tsx]
        └── ObjectBrowserInternalProvider
              └── ObjectBrowserWidgetComponent
                    ├── ObjectBrowserTags       [ObjectBrowserTags.tsx]
                    ├── ObjectBrowserTrigger
                    │     └── ObjectBrowserModal [ObjectBrowserModal.tsx]
                    │           └── ObjectBrowserWidgetBody [ObjectBrowserWidgetBody.tsx]
                    ├── Description
                    └── FieldError
```

---

## Props / Config (`UseObjectBrowserConfig`)

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `mode` | `'multiple' \| 'single'` | `'multiple'` | Selection mode hint (GridList always uses `multiple`) |
| `widgetOptions` | `{ pattern_options?: { maximumSelectionSize?, selectableTypes? } }` | `{}` | Controls selection limits and type filtering |
| `selectedAttrs` | `Array<keyof Brain>` | `['@id','title','description','@type','UID']` | Which Brain fields are forwarded to `onChange` |
| `onChange` | `(selected: Partial<Brain>[]) => void` | — | Called on every selection change |
| `defaultValue` | `Brain[]` | `[]` | Pre-selected items |
| `title` | `string` | — | Modal heading |
| `initialPath` | `string` | — | Starting browse path (comes from `content['@id']` via route loader) |

`widgetOptions` flows from the JSON schema field definition through:
`BlockSettingsFormRenderer` → `field.Quanta` (TanStack Form) → `Field.tsx` (`renderFieldWidget` spreads `...fieldProps`) → `ObjectBrowserWidget` props → `ObjectBrowserProvider` config → context.

---

## Navigation (`ObjectBrowserNavigationContext`)

- Owns `currentPath` (starts at `initialPath`)
- `navigateTo(path, mode?)` — pushes or replaces path in history stack
- `goBack()` — pops history stack
- `canGoBack` — true when history stack has more than 1 entry
- History is an in-memory array (`useState`), not the URL router

---

## Data Fetching (`ObjectBrowserContext`)

- Uses `useFetcher` from react-router
- Path browse: `/@objectBrowserWidget{path}?path.depth=1&metadata_fields:list=is_folderish`
- Search: `/@objectBrowserWidget?metadata_fields:list=is_folderish&SearchableText={text}`
- `useEffect` triggers fetch whenever `currentPath`, `searchMode`, or debounced `SearchableText` (350ms) changes
- `items` — current page from `fetcher.data.results.items`, resets on each fetch
- `knownItems` — accumulated items across ALL fetches via `useAccumulatedItems`, merges by `@id`, never shrinks

**Key distinction**: `items` is the current page only. `knownItems` is all items ever seen. `handleSelectionChange` resolves Brain objects from `knownItems`, not `items`.

---

## Selection State

- `selectedKeys: Set<{id: string, title: string}>` — source of truth for selection
- Initialized from `defaultValue` via `initializeSelectedKeys`
- `selectedItems` (derived) — `Array.from(selectedKeys).map(k => k.id)`, plain string array of `@id` values, passed as `selectedKeys` to GridList

**Add** — `handleSelectionChange(keys: Selection)`: called by GridList `onSelectionChange`. Resolves full Brain objects from `knownItems` via `processSelection`, updates `selectedKeys`, calls `onChange`.

**Remove** — `handleRemove(keys: Set<Key>)`: called by TagGroup when user removes a tag. Filters `selectedKeys`, resolves Brain objects from `knownItems`, calls `onChange`.

`filterBrainAttributes` strips Brain objects down to only `selectedAttrs` before calling `onChange`.

---

## `maximumSelectionSize` + `selectableTypes` Enforcement

`disabledKeys` is computed with `useMemo` in the `ObjectBrowserWidgetBody` component body, re-running whenever `selectedItems`, `items`, or `widgetOptions` changes. It is passed as the `disabledKeys` prop directly to `GridList` — react-aria watches this prop reactively at the collection level.

> **Why not `isDisabled` on GridListItem?**
> react-aria's GridList only re-invokes the render callback `{(item) => ...}` when the `items` prop changes, NOT when `selectedKeys` or other props change. Computing disabled state inside the callback produces stale values after selection. `disabledKeys` on the parent GridList is the correct reactive pattern.

Disable logic (per visible item):
```
if selectableTypes is set AND item['@type'] not in selectableTypes → disabled
if maximumSelectionSize is set AND selectedItems.length >= max AND item not selected → disabled
```

Navigation (`onAction`) is also blocked for disabled items (`onAction={undefined}`) so at-limit items cannot be navigated into.

---

## GridList Configuration

```tsx
<GridList
  selectionMode="multiple"
  selectionBehavior="toggle"
  disabledBehavior="selection"   // disabled items: no selection, focus still works
  disabledKeys={disabledKeys}    // reactive, computed in component body
  selectedKeys={selectedItems}   // controlled
  onSelectionChange={handleSelectionChange}
  items={items ?? []}
  key={`${viewMode}-${currentPath}`}  // remounts on path/view change
>
  {(item) => (
    <GridListItem
      onAction={disabledKeys.includes(item['@id']) ? undefined : () => handleNavigation(item)}
      data-selectable={!disabledKeys.includes(item['@id'])}
    />
  )}
</GridList>
```

---

## Modal + Search

- Slide-in panel, fixed right sidebar, 360px wide
- Default view: breadcrumb navigation + item list
- Search mode: toggled by search button in modal header. URL switches from path-based to `SearchableText`-based query. Reset clears search and fetcher data.
- Two view modes (list/grid) toggled by a button — triggers GridList remount via `key` change

---

## Tags Display

`ObjectBrowserTags` renders the current selection as removable tags via react-aria `TagGroup`. Driven entirely from `selectedKeys` context. `onRemove` calls `handleRemove` in context.

---

## Supported Cases

| `maximumSelectionSize` | `selectableTypes` | Behaviour |
|---|---|---|
| not set | not set | Unlimited multi-select of any type |
| `1` | not set | Single-select; all others disabled once one is picked |
| `N > 1` | not set | Up to N items; rest disabled at limit |
| not set | `['Image']` | Only Image type selectable; all others always disabled |
| `1` | `['Image']` | Single image picker |

---

## Example Schema Usage

```tsx
href: {
  widget: 'object_browser',
  widgetOptions: {
    pattern_options: {
      maximumSelectionSize: 1,
      selectableTypes: ['Document', 'Folder'],
    },
  },
  selectedItemAttrs: ['@id', 'title', '@type'],
}
```

---

---

# Part 2 — Volto Core Implementation

Source files:
- `packages/volto/src/components/manage/Sidebar/ObjectBrowser.jsx` — HOC wrapper
- `packages/volto/src/components/manage/Sidebar/ObjectBrowserBody.jsx` — main container
- `packages/volto/src/components/manage/Sidebar/ObjectBrowserNav.jsx` — item list/grid
- `packages/volto/src/components/manage/Sidebar/SidebarPopup.jsx` — modal portal
- `packages/volto/src/components/manage/Widgets/ObjectBrowserWidget.jsx` — form widget

## Component Tree

```
withObjectBrowser (HOC)                  [ObjectBrowser.jsx]
  └── WrappedComponent
  └── SidebarPopup (portal)             [SidebarPopup.jsx]
        └── ObjectBrowserBody           [ObjectBrowserBody.jsx]  ← Redux-connected class component
              └── ObjectBrowserNav      [ObjectBrowserNav.jsx]   ← renders item list/grid

ObjectBrowserWidget                     [ObjectBrowserWidget.jsx]
  └── withObjectBrowser(withRouter(connect(...)(Widget)))
  └── Renders chips/labels + browse button
```

## Props / Config

### `openObjectBrowser()` options
| Prop | Purpose |
|---|---|
| `mode` | `'image' \| 'link' \| 'multiple'` |
| `onSelectItem(url, item)` | Custom selection callback |
| `dataName` | Block data property to update |
| `selectableTypes` | Types that can be selected |
| `maximumSelectionSize` | Max items in multiple mode |
| `currentPath` | Starting browse path |
| `onlyFolderishSelectable` | Only allow selecting folders |
| `searchableTypes` | Types to include in search queries |

### `ObjectBrowserWidget` props
| Prop | Purpose |
|---|---|
| `mode` | `'image' \| 'link' \| 'multiple'` (default `'multiple'`) |
| `return` | `'single' \| 'multiple'` — value format |
| `allowExternals` | Show manual URL input |
| `selectedItemAttrs` | Attributes to preserve on selected item |
| `widgetOptions.pattern_options.selectableTypes` | Type filter |
| `widgetOptions.pattern_options.maximumSelectionSize` | Selection cap |
| `widgetOptions.pattern_options.onlyFolderishSelectable` | Folders only |

## State Management

- **Redux**: `state.search.subrequests[block-mode]` stores results. Uses `searchContent` action dispatching to `/@search` endpoint.
- **Local state** (class component): `currentFolder`, `parentFolder`, `currentImageFolder`, `currentLinkFolder`, `selectedImage`, `selectedHref`, `showSearchInput`, `searchableTypes`, `view`

## Data Fetching

All data fetched via `/@search` endpoint with Redux `searchContent` action.

| Scenario | Endpoint | Params |
|---|---|---|
| Browse folder | `/{path}/@search` | `path.depth=1, sort_on=getObjPositionInParent, metadata_fields=_all, b_size=1000` |
| Text search (3+ chars) | `/@search` | `SearchableText={text}*, metadata_fields=_all, portal_type=[...]` |
| Path input (starts with `/`) | `/{text}/@search` | `path.depth=1, portal_type=[...]` |
| Resolve manual URL | `/@search` | `path.query={url}, path.depth=0` |

## Navigation

- `currentFolder` tracked in local state
- `parentFolder` tracked for back button
- Breadcrumbs split `currentFolder` by `/` and render each segment as clickable
- Back button shows when `currentFolder !== '/'`
- Separate path tracking per mode: `currentImageFolder`, `currentLinkFolder`

## Selection Logic (`isSelectable`)

```javascript
isSelectable(item) {
  // 1. onlyFolderishSelectable
  if (onlyFolderishSelectable && !item.is_folderish) return false;
  // 2. max reached — only allow deselection of already-selected
  if (maximumSelectionSize && data && mode === 'multiple' && maximumSelectionSize <= data.length)
    return data.some(d => flattenToAppURL(d['@id']) === flattenToAppURL(item['@id']));
  // 3. type filter
  return selectableTypes.length > 0 ? selectableTypes.includes(item['@type']) : true;
}
```

`maximumSelectionSize = 1` special case: clears existing selection to allow replacement.

Auto-closes browser when limit is reached after add, or drops below limit after remove.

## Mode Differences

| | `image` | `link` | `multiple` |
|---|---|---|---|
| Default view | Icons (grid) | List | List |
| View toggle | Yes (grid ↔ list) | No | No |
| Selection | Single | Single | Multiple |
| Folder click | Navigate | Navigate (arrow button) | Navigate (arrow button) |
| Image click | Select | — | — |
| Auto-close | On select | On select | Never |
| Search types | `config.settings.imageObjects` | All | All |

## External Links (`allowExternals`)

- Shows manual text input in widget when no items selected
- Validates external URLs (`http://`, `https://`)
- Internal URLs resolved via `path.depth=0` search to get full Brain object
- External URLs stored as `{ '@id': url, title: removeProtocol(url) }`
- Display icon differs: home icon (internal) vs blank/external icon (external)

## Tags Display

- Semantic UI `<Label>` chips with hover `<Popup>` showing full URL
- Image types render thumbnail (`@@images/image/thumb`)
- Other types render title
- × button removes item in `multiple` mode
- Rendered from current `value` prop directly (no separate state)

## `selectedItemAttrs` Filtering

```javascript
resultantItem = Object.keys(item)
  .filter(key => [...selectedItemAttrs, '@id', 'title'].includes(key))
  .reduce((obj, key) => { obj[key] = item[key]; return obj; }, {});
```

---

---

# Part 3 — What cmsui Is Missing / Differences

| Feature | Volto Core | cmsui (seven) | Gap |
|---|---|---|---|
| **`mode: 'image'`** | Full image mode: grid view, thumbnail display, `imageObjects` type filter | Not implemented | ❌ Missing |
| **View toggle (grid/list)** | Only in image mode | Available in both modes | ✅ cmsui has more |
| **`allowExternals`** | Manual URL input, external URL validation, internal URL resolution | Not implemented | ❌ Missing |
| **`onlyFolderishSelectable`** | Supported in `isSelectable` | Not in `disabledKeys` logic | ❌ Missing |
| **Auto-close on limit reached** | Closes browser when `maximumSelectionSize` hit | Does not auto-close | ❌ Missing |
| **`maximumSelectionSize = 1` replace** | Clears selection to enable replacement | Not handled specially | ❌ Missing |
| **Selection counter** | "Selected items: 3 of 5" shown in header | Not shown | ❌ Missing |
| **Text search threshold** | 3 characters minimum | Debounced, no minimum | Different |
| **Path input search** | Input starting with `/` triggers path browse | Not supported | ❌ Missing |
| **Breadcrumbs** | Split from path string, clickable segments | react-aria Breadcrumbs component from fetcher data | Different implementation |
| **Back button** | Based on `parentFolder` state | Based on navigation history stack | Different implementation |
| **State management** | Redux (`searchContent`, `subrequests`) | react-router `useFetcher` | Different (cmsui is simpler) |
| **`onSelectItem` callback** | Supported (custom selection handler override) | `onChange` only | Different API |
| **`dataName` prop** | Direct block data property update | Not applicable (form field pattern) | Different pattern |
| **`searchableTypes`** | Separate from `selectableTypes`; affects search query `portal_type` | Not sent to API | ❌ Missing |
| **Item thumbnail in chips** | Image types show `@@images/image/thumb` | Title text only | ❌ Missing for images |
| **External URL icon** | Different icon for external vs internal | Not applicable (no externals) | ❌ Missing |
| **Manual URL resolve** | Resolves internal manual URLs to full Brain objects | Not applicable | ❌ Missing |
| **`ObjectBrowserWidgetMode` factory** | Mode-preset widget factory | Not present | ❌ Missing |
| **`withObjectBrowser` HOC** | Reusable HOC for any component | Not applicable (context pattern) | Different pattern |
