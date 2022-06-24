---
html_meta:
  "description": "Slate Editor configuration settings"
  "property=og:description": "Slate Editor configuration settings"
  "property=og:title": "Editor Configuration"
  "keywords": "Volto, Plone, frontend, React, Slate, Slate-React, volto-slate"
---

# Editor Configuration

You can customize how `volto-slate` editor behaves and its features.
These are controlled from the `config.js` settings.

## `defaultBlockType`

The default block type for a website.

```js
config.settings.defaultBlockType = 'slate';
```

## `slate.toolbarButtons`

This setting contains the default enabled Slate `inlineToolbar` buttons.

```js
config.settings.slate.toolbarButtons = [
    'bold',
    'italic',
    'strikethrough',
    'link',
...
  ];
```

## `slate.buttons`

The Slate toolbar button components.

```js
settings.slate.buttons = [
    ...settings.slate.buttons,
    'block-quote': <BlockButton ... />
  ];
```

## `slate.expandedToolbarButtons`

The toolbar buttons rendererd in `ExpandedToolbar`.

```js
slate.expandedToolbarButtons = [...(slate.expandedToolbarButtons || []), LINK];
```

## `slate.contextToolbarButtons`

These components are rendered in the toolbar on demand, as configured by plugins for a given context or value.
By default it takes the value of `toolbarButtonIcon`.

```js
slate.contextToolbarButtons = [
  ...(state.contextToolbarButtons || []),
  (props) => <ToolBarButtonComponent /> || null,
];
```

## `slate.elementToolbarButtons`

Each `Element` node type available in the editor can be configured to have specific toolbar buttons shown above the element of that type when it contains the selection.

```js
slate.elementToolbarButtons = [
  ...(slate.elementToolbarButtons || []),
  (props) => <ElementButtonComponent /> || null,
];
```

(persistent-helpers-label)=

## `slate.persistentHelpers`

A set of components that are always rendered, unlike the button variety.
They make it possible to orchestrate form-based editing of components.

```js
slate.persistentHelpers = [
  ...(slate.persistentHelpers || []),
  (props) => <MyPersistantComponent /> || null,
];
```

## `slate.extensions`

The slate editor is "decorated" with the capabilities from this list.

```js
slate.extensions = [
  ...(slate.extensions || []),
  insertData,
  isInline,
  normalizeNode,
];
```

## `slate.hotkeys`

Shortcut keys pertaining to a feature from a plugin or behavior.

```js
slate.hotkeys = {
  ...slate.hotkeys,
  'mod+b': { format: 'strong', type: 'inline' },
  //more hotkeys, including from plugins!
};
```

## `slate.keyDownHandlers`

Handle `keyDown` events for the slate editor.

```js
slate.keyDownHandlers = { 'mod+b': () => {} };
```

## `slate.elements`

Render `View` and `Edit` components for a particular slate element that consumes deserialized or normalized data.

```js
slate.elements = {
  ...(slate.elements || {}),
  h1: ({ attributes, children }) => <h1 {...attributes}>{children}</h1>,
  element: (props) => <ElementComponent {...props} mode="edit" />,
};
```

## `slate.htmlTagsToSlate`

Transform HTML element tags to a Slate-compatible JSON structure.

```js
slate.htmlTagsToSlate = {
  ...slate.htmlTagsToSlate,
  B: bTagDeserializer,
  element: elementDeserializer,
  ...
};
```

## `slate.nodeTypesToHighlight`

Adds "highlight" decoration in the editor.
Used by the `highlightByType` method.

```js
slate.nodeTypesToHighlight.push(elementType);
```

## `slate.runtimeDecorators`

These are "runtime" decorator functions.
These are transient decorations that are applied in the editor.
They are not persisted in the final value, so they are useful, for example, to highlight search results or a certain type of node.

```js
slate.runtimeDecorators = [([node, path], ranges) => ranges];
```
