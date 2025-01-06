---
myst:
  html_meta:
    'description': 'Volto block with custom schema and view components'
    'property=og:description': 'Volto block with custom schema and view components'
    'property=og:title': 'Volto block with custom schema and view components'
    'keywords': 'Volto, React, blocks, grid, container, Plone'
---

(custom-schema-and-view)=

# Block with a custom schema

You can create a block with several settings defined using a schema, and let Volto render the edit form by itself.

To do so, define the schema, the view component, and configure the block settings.

## Preparations

In your Volto add-on, create a subfolder {file}`ExampleBlock01` inside the {file}`components` folder to save all the files required to create a block.

## Schema

Create a {file}`Schema.js` file inside the {file}`ExampleBlock01` folder, with the following contents.

```js
import messages from './messages';

const Schema = ({ intl }) => {
  return {
    title: intl.formatMessage(messages.block01),
    block: 'block01',
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.default),
        fields: ['url', 'title'],
      },
    ],

    properties: {
      url: {
        title: intl.formatMessage(messages.URL),
        widget: 'url',
      },
      title: {
        title: intl.formatMessage(messages.title),
      },
    },
    required: [],
  };
};

export default Schema;
```

## Messages

As you may have noted, you prepared the block for internationalization.
{term}`Internationalization` (i18n) is the process of creating user interfaces which are suitable for different languages and cultural contexts.
To add translatable messages, create a file {file}`messages.js` in the same {file}`ExampleBlock01` folder with the following contents.

```js
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  block01: {
    id: 'block01',
    defaultMessage: 'Block 01',
  },
  default: {
    id: 'default',
    defaultMessage: 'Default',
  },
  URL: {
    id: 'URL',
    defaultMessage: 'URL',
  },
  title: {
    id: 'title',
    defaultMessage: 'Title',
  },
});

export default messages;
```

## View component

The view component will have all the required logic to show the information saved on the block.
It will be a small HTML fragment.

Create a file {file}`View.jsx` in the {file}`ExampleBlock01` folder with the following contents.

```jsx
import cx from 'classnames';
import React from 'react';

const View = (props) => {
  // - `data` holds the values entered in the block edit form.
  // - `className` holds the CSS class names injected into this block
  //   by Volto's `styleClassNameExtenders`.
  // - `style` holds the CSS properties injected into this block
  //   by Volto's `Block Style Wrapper`.
  const { data, className, style } = props;
  return (
    <div className={cx('block', 'block01', className)} style={style}>
      I am the Block view component!
      <ul>
        <li>Title: {data.title}</li>
        <li>URL: {data.url}</li>
      </ul>
    </div>
  );
};

export default View;
```

## Block configuration

With all the block components ready, you need to register the block into Volto.

To do so, open your add-on's {file}`index.js` file, and insert the following contents before the last `return config;` statement.

```js
config.blocks.blocksConfig.block01 = {
  id: 'block01', // this is the block id, it must match the id on the previous line
  title: 'Block 01', // this is the block title
  view: View01, // this is the block's view component
  // We do not need a specific edit component, Volto will use the default
  // edit: null;
  blockSchema: Schema01, // this is the schema that will be used to render the edit form
  icon: imagesSVG, // this is the image that will be shown in the block selector
  sidebarTab: 1, // this is set to 1 to have the `Block` tab selected in the sidebar
  // editor when editing this block
};
```

At the top of the file, import the relevant components as follows.

```js
import View01 from './components/ExampleBlock01/View';
import Schema01 from './components/ExampleBlock01/Schema';

// This is the icon we use for the example, use a meaningful one or provide your own image.
import imagesSVG from '@plone/volto/icons/images.svg';
```

## See it in action

Your block is ready to be used in your site.

Restart your Volto site, and now you can add the new block from the block chooser found in the {guilabel}`Edit` <img alt="Edit icon" src="../../_static/pen.svg" class="inline"> or {guilabel}`Add` <img alt="Add icon" src="../../_static/add-document.svg" class="inline"> content views.
