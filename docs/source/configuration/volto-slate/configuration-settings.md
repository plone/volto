---
html_meta:
  'description': 'Slate Editor configuration settings'
  'property=og:description': 'Slate Editor configuration settings'
  'property=og:title': 'Editor Configuration'
  'keywords': 'Volto, Plone, frontend, React, slate, slate-react, volto-slate'
---

# Editor Configuration

You can customize how volto-slate Editor behaves and its features. These are
controlled from the `config.js` settings.

## defaultBlockType

The default block type for a website

```
config.settings.defaultBlockType = 'slate';
```

## slate.toolbarButtons

This setting contains the default enabled slate inlineToolbar buttons.

```js
config.settings.slate.toolbarButtons = [
    'bold',
    'italic',
    'strikethrough',
    'link',
...
  ];
```

## slate.buttons

The slate toolbar button components.

```js
settings.slate.buttons = [
    ...settings.slate.buttons,
    'block-quote': <BlockButton ... />
  ];
```

## slate.expandedToolbarButtons

The toolbar buttons rendererd in ExpandedToolbar.

```js
slate.expandedToolbarButtons = [...(slate.expandedToolbarButtons || []), LINK];
```

## slate.contextToolbarButtons

These components are rendered in the toolbar on demand, as configured by
plugins for a given context/value. By default it takes the value of `toolbarButtonIcon`.

```js
slate.contextToolbarButtons = [
  ...(state.contextToolbarButtons || []),
  (props) => <ToolBarButtonComponent /> || null,
];
```

## slate.elementToolbarButtons

Each Element node type available in the editor can be configured to have
specific toolbar buttons shown above the element of that type when it
contains the selection.

```js
slate.elementToolbarButtons = [
  ...(slate.elementToolbarButtons || []),
  (props) => <ElementButtonComponent /> || null,
];
```

## slate.persistentHelpers

A set of components that are always rendered, unlike the button variety.
They make it possible to orchestrate form-based editing of components.

```js
slate.persistentHelpers = [
  ...(slate.persistentHelpers || []),
  (props) => <MyPersistantComponent /> || null,
];
```

## slate.extensions

The slate editor is "decorated" with the capabilities from this list.

```js
slate.extensions = [
  ...(slate.extensions || []),
  insertData,
  isInline,
  normalizeNode,
];
```

## slate.hotkeys

Shortcut keys pertaining to a feature from a plugin or behaviour.

```js
slate.hotkeys = {
  ...slate.hotkeys,
  'mod+b': { format: 'strong', type: 'inline' },
  //more hotkeys, including from plugins!
};
```

## slate.keyDownHandlers

Handle keyDown events for slate editor.

```js
slate.keyDownHandlers = { 'mod+b': () => {} };
```

## slate.elements

Render View and Edit component for a particular slate element that consumes deserialized/normalized data.

```js
slate.elements = {
  ...(slate.elements || {}),
  h1: ({ attributes, children }) => <h1 {...attributes}>{children}</h1>,
  element: (props) => <ElementComponent {...props} mode="edit" />,
};
```

## slate.htmlTagsToSlate

Transform html element tags to Slate compatible json structure.

```js
slate.htmlTagsToSlate = {
  ...slate.htmlTagsToSlate,
  B: bTagDeserializer,
  element: elementDeserializer,
  ...
};
```

## Adding an underline button feature

In this chapter we will learn how to change settings for the Rich Text Editor.
We will add a button to the toolbar to underline the selected text.

In the `config.js` file we will create a new button.

```jsx
import React from 'react';
import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';

const UnderlineButton = createInlineStyleButton({
  style: 'UNDERLINE',
  children: <Icon name={underlineSVG} size="24px" />,
});
```

Next we will add the button to the toolbar.

```js
export const settings = {
  ...defaultSettings,
  richTextEditorInlineToolbarButtons: [
    UnderlineButton,
    ...defaultSettings.richTextEditorInlineToolbarButtons,
  ],
};
```

## Add a code button feature

Add a button to the toolbar to style a text selection as `CODE`.

```js
/**
 * Add your config changes here.
 * @module config
 * @example
 * export const settings = {
 *   ...defaultSettings,
 *   port: 4300,
 *   listBlockTypes = [
 *     ...defaultSettings.listBlockTypes,
 *     'my-list-item',
 *   ]
 * }
 */

import React from 'react';
import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';
import codeSVG from '@plone/volto/icons/code.svg';

import {
  settings as defaultSettings,
  views as defaultViews,
  widgets as defaultWidgets,
  blocks as defaultBlocks,
} from '@plone/volto/config';

import { AlbumView, FullView, RatingWidget } from './components';

const UnderlineButton = createInlineStyleButton({
  style: 'UNDERLINE',
  children: <Icon name={underlineSVG} size="24px" />,
});

const CodeButton = createInlineStyleButton({
  style: 'CODE',
  children: <Icon name={codeSVG} size="24px" />,
});

export const settings = {
  ...defaultSettings,
  richTextEditorInlineToolbarButtons: [
    CodeButton,
    UnderlineButton,
    ...defaultSettings.richTextEditorInlineToolbarButtons,
  ],
};

export const views = {
  ...defaultViews,
  layoutViews: {
    ...defaultViews.layoutViews,
    album_view: AlbumView,
    full_view: FullView,
  },
};

export const widgets = {
  ...defaultWidgets,
  id: {
    ...defaultWidgets.id,
    rating: RatingWidget,
  },
};

export const blocks = {
  ...defaultBlocks,
};
```
