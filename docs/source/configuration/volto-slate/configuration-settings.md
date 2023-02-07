---
myst:
  html_meta:
    "description": "Slate Editor configuration settings"
    "property=og:description": "Slate Editor configuration settings"
    "property=og:title": "Editor Configuration"
    "keywords": "Volto, Plone, frontend, React, Slate, Slate-React, volto-slate"
---

(editor-configuration-label)=

# Editor Configuration

You can customize how `volto-slate` editor behaves and its features.
These are controlled from the `config.js` settings.


(editor-configuration-defaultBlockType-label)=


## `slate.styleMenu`

Add a menu applying CSS classes to text passages or entire paragraphs.

`slate.styleMenu.inlineStyles` are applied to selected text passages, while `slate.styleMenu.blockStyles` are applied to selected paragraphs.

```{image} ../../_static/style_menu.png
:alt: Style Menu
```

```js
slate.styleMenu.inlineStyles = [
    {
      cssClass: 'cool-inline-text',
      label: 'Cool Inline Text',
      icon: (props) => <Icon name={iconSVG} size="24px" />,
    },
  ];
  slate.styleMenu.blockStyles = [
    {
      cssClass: 'underline-block-text',
      label: 'Cool Block Text',
      icon: (props) => <Icon name={iconSVG} size="24px" />,
    },
  ];
```

## `defaultBlockType`

The default block type for a website.

```js
config.settings.defaultBlockType = 'slate';
```


(editor-configuration-slate-toolbarButtons-label)=

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


(editor-configuration-slate-buttons-label)=

## `slate.buttons`

The Slate toolbar button components.

```jsx
settings.slate.buttons = [
    ...settings.slate.buttons,
    'block-quote': <BlockButton ... />
  ];
```


(editor-configuration-slate-expandedtoolbarbuttons-label)=

## `slate.expandedToolbarButtons`

The toolbar buttons rendered in `ExpandedToolbar`.

```js
slate.expandedToolbarButtons = [...(slate.expandedToolbarButtons || []), LINK];
```


(editor-configuration-slate-contexttoolbarbuttons-label)=

## `slate.contextToolbarButtons`

These components are rendered in the toolbar on demand, as configured by plugins for a given context or value.
By default, it takes the value of `toolbarButtonIcon`.

```jsx
slate.contextToolbarButtons = [
  ...(state.contextToolbarButtons || []),
  (props) => <ToolBarButtonComponent /> || null,
];
```


(editor-configuration-slate-elementtoolbarbuttons-label)=

## `slate.elementToolbarButtons`

Each `Element` node type available in the editor can be configured to have specific toolbar buttons shown above the element of that type when it contains the selection.

```jsx
slate.elementToolbarButtons = [
  ...(slate.elementToolbarButtons || []),
  (props) => <ElementButtonComponent /> || null,
];
```

(persistent-helpers-label)=


(editor-configuration-slate-persistenthelpers-label)=

## `slate.persistentHelpers`

A set of components that are always rendered, unlike the button variety.
They make it possible to orchestrate form-based editing of components.

```jsx
slate.persistentHelpers = [
  ...(slate.persistentHelpers || []),
  (props) => <MyPersistantComponent /> || null,
];
```


(editor-configuration-slate-extensions-label)=

## `slate.extensions`

The Slate editor is "decorated" with the capabilities from this list.

```js
slate.extensions = [
  ...(slate.extensions || []),
  insertData,
  isInline,
  normalizeNode,
];
```


(editor-configuration-slate-hotkeys-label)=

## `slate.hotkeys`

Shortcut keys pertaining to a feature from a plugin or behavior.

```js
slate.hotkeys = {
  ...slate.hotkeys,
  'mod+b': { format: 'strong', type: 'inline' },
  //more hotkeys, including from plugins!
};
```


(editor-configuration-slate-keydownhandlers-label)=

## `slate.keyDownHandlers`

Handle `keyDown` events for the Slate editor.

```js
slate.keyDownHandlers = { 'mod+b': () => {} };
```


(editor-configuration-slate-elements-label)=

## `slate.elements`

Render `View` and `Edit` components for a particular Slate element that consumes deserialized or normalized data.

```jsx
slate.elements = {
  ...(slate.elements || {}),
  h1: ({ attributes, children }) => <h1 {...attributes}>{children}</h1>,
  element: (props) => <ElementComponent {...props} mode="edit" />,
};
```


(editor-configuration-slate-htmltagstoslate-label)=

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


(editor-configuration-slate-nodetypestohighlight-label)=

## `slate.nodeTypesToHighlight`

Adds "highlight" decoration in the editor.
Used by the `highlightByType` method.

```js
slate.nodeTypesToHighlight.push(elementType);
```


(editor-configuration-slate-runtimedecorators-label)=

## `slate.runtimeDecorators`

These are "runtime" decorator functions.
These are transient decorations that are applied in the editor.
They are not persisted in the final value, so they are useful, for example, to highlight search results or a certain type of node.

```js
slate.runtimeDecorators = [([node, path], ranges) => ranges];
```


(editor-configuration-blocks-initialBlocksFocus-label)=

## `blocks.initialBlocksFocus`

Determine which type of block should be selected on edit.

```js
blocks.initialBlocksFocus === {
  <content type name>: <block type>
};
```

Disable selection of any block and prevent scrolling to a block:

```js
blocks.initialBlocksFocus === null;
```
