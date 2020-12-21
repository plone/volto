# RichEditor Settings

You can customize how the Rich Text Editor behaves and its features. These are
controlled from the `config.js` settings.

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
*   listBlockTypes: {
*     ...defaultSettings.listBlockTypes,
*     'my-list-item',
*   }
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
