---
myst:
  html_meta:
    "description": "Volto block with custom schema and view components"
    "property=og:description": "Volto block with custom schema and view components"
    "property=og:title": "Volto block with custom schema and view components"
    "keywords": "Volto, React, blocks, grid, container, Plone"
---

(custom-schema-and-view)=

# Block with a custom schema

We can create a block with several settings defined using a schema, and let Volto render the edit form by itself.

What we need to do is to define the schema, the view component, and configure the block settings.

## Preparations

In your volto addon, create a folder inside the {file}`components` folder to save all the files required to create a block.

Name this folder as {file}`ExampleBlock02`.

## Schema

Create a {file}`Schema.js` file inside the {file}`ExampleBlock02` folder, with the following contents:

```js
import messages from './messages';

const Schema = ({ intl }) => {
  return {
    title: intl.formatMessage(messages.block02),
    block: 'block02',
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

As you have noted, we have prepared the block to be internationalized, {term}`internanationalization` (i18n), is the process of creating user interfaces which are suitable for different languages and cultural contexts.

So we need a file {file}`messages.js` in the same {file}`ExampleBlock02` folder with the following contents:

```js
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  block02: {
    id: 'block02',
    defaultMessage: 'Block 02',
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

In our case will be a samll HTML fragment.

Create a file {file}`View.jsx` in the {file}`ExampleBlock02` folder with the following contents:

```jsx
import cx from 'classnames';
import React from 'react';

const View = (props) => {
  // data holds the values entered in the block edit form
  // className holds the CSS class names injected to this block by Volto's `styleClassNameExtenders`
  // style holds the CSS properties injected to this block by Volto's `Block Sytle Wrapper`
  const { data, className, style } = props;
  return (
    <div className={cx('block', 'block02', className)} style={style}>
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

To do so, open your addon's {file}`index.js` file, that will have the following contents:

```js
const applyConfig = (config) => {
  config.settings.isMultilingual = false;
  config.settings.supportedLanguages = ['en'];
  config.settings.defaultLanguage = 'en';


  return config;
}

export default applyConfig;
```

And before the last `return config;` statement, write the following configuration:

```js
config.blocks.blocksConfig.block02 = {
    id: 'block02', // this is the block id, it must match the id on the previous line
    title: 'Block 02', // this is the block title
    view: View02, // this is the block's view component
    // edit: null;
    blockSchema: Schema02, // this is the schema that will be used to render the edit form
    icon: imagesSVG, // this is the image that will be shown in the block selector
    sidebarTab: 1, // this is set to 1 to have the `Block` tab selected in the sidebar editor when editing this block
  };
```

On the top of the file you will need to import the relevant components, as follows:

```js
import View02 from './components/ExampleBlock02/View';
import Schema02 from './components/ExampleBlock02/Schema';

// This is the icon we use for the example, use a meaningful one or provide your own image.
import imagesSVG from '@plone/volto/icons/images.svg';
```

## See it in action

Your block is ready to be used in your site.

Restart your Volto site and you will be able to add it using the block add form.
