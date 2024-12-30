---
myst:
  html_meta:
    "description": "Volto block with custom schema and view components"
    "property=og:description": "Volto block with custom schema and view components"
    "property=og:title": "Volto block with custom schema"
    "keywords": "Volto, React, blocks, grid, container, Plone"
---

(custom-schema-and-view)=

# Block with a custom schema

We can create a block with several settings defined using a schema, and let Volto render the edit form by itself.

What we need to do is to define the schema, the view component, and configure the block settings.

## Preparation

In your volto addon, create a folder inside the {file}`components` folder to save all the files required to create a block.

Name this folder as {file}`ExampleBlock`.

## Schema

Create a {file}`schema.js` inside the {file}`ExampleBlock` folder, with the following contents:

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

So we need a file {file}`messages.js` in the same {file}`ExampleBlock` folder with the following contents:

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

Create a file {file}`View.jsx` in the {file}`ExampleBlock` folder with the following contents:

```jsx
import cx from 'classnames';
import React from 'react';

const View = (props) => {
  // data holds the values entered in the block edit form
  // className holds the CSS class names injected to this block by other Volto features
  // style holds the CSS properties injected to this block by other Volto featured
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
    id: 'block02',
    title: 'Block 02',
    view: View02,
    // edit: null;
    blockSchema: Schema02,
    icon: imagesSVG,
    sidebarTab: 1,
  };
```

On the top of the file you will need to import the relevant components, as follows:

```js
import View02 from './components/ExampleBlock/View';
import Schema02 from './components/ExampleBlock/Schema';



```
