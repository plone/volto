---
myst:
  html_meta:
    "description": "Volto block with custom schema and view components using variations"
    "property=og:description": "Volto block with custom schema and view components using variations"
    "property=og:title": "Volto block with custom schema and view components using variations"
    "keywords": "Volto, React, blocks, schema, variation, view component, Plone"
---

(custom-schema-view-and-variations)=

# Block with a custom schema and variations

We can create a block that uses `variations`.
A {term}`variation` is an alternative view of a block.
This variation is shown as an additional option in the block settings sidebar and lets the editor change how this block is rendered.

To do so, define the schema, view component, and variations, then configure the block settings.

## Preparations

In your Volto add-on, create a subfolder {file}`ExampleBlock05` inside the {file}`components` folder to save all the files required to create a block and its variations.

## Schema

Create a {file}`Schema.js` file inside the {file}`ExampleBlock05` folder, with the following contents.

```js
import messages from './messages';

const Schema = ({ intl }) => {
  return {
    title: intl.formatMessage(messages.block05),
    block: 'block05',
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

To do so, create a file {file}`messages.js` in the same {file}`ExampleBlock05` folder with the following contents.

```js
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  block05: {
    id: 'block05',
    defaultMessage: 'Block 05',
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

For variations, the view component needs to use the variation template to render the contents of the block.
You can do so using the `variation` from the `props` of the block.

Create a file {file}`View.jsx` in the {file}`ExampleBlock05` folder with the following contents.

```jsx
import withBlockExtensions from '@plone/volto/helpers/Extensions/withBlockExtensions';
import cx from 'classnames';
import React from 'react';

const View = (props) => {
  // - `data` holds the values entered in the block edit form.
  // - `className` holds the CSS class names injected into this block
  //   by Volto's `styleClassNameExtenders`.
  // - `style` holds the CSS properties injected into this block
  //   by Volto's `Block Style Wrapper`.
  // - `variation` holds the variation selected in the block editor,
  //   and it is an object as defined in the block configuration.
  const { data, className, style, variation } = props;

  const BodyTemplate = variation?.template;

  return (
    <div
      className={cx(
        'block',
        'block05',
        `block05-variation-${variation?.id}`,
        className,
      )}
      style={style}
    >
      <BodyTemplate data={data} />
    </div>
  );
};

export default withBlockExtensions(View);
```

The `withBlockExtensions` {term}`HOC` makes the variation selector available in the block edit form and provides the `variation` property in the props.

## Variations

Next create one or more variations that will be available for this block.

Create a file {file}`VariationView01.jsx` in the {file}`ExampleBlock05` folder with the following contents.

```jsx
import React from 'react';

const View = (props) => {
  const { data } = props;
  return (
    <>
      <h2>Variation View 01</h2>
      <div>
        <ul>
          <li>Title: {data.title}</li>
          <li>URL: {data.url}</li>
        </ul>
      </div>
    </>
  );
};

export default View;
```

Create a file {file}`VariationView02.jsx` in the {file}`ExampleBlock05` folder with the following contents.

```jsx
import React from 'react';

const View = (props) => {
  const { data } = props;
  return (
    <>
      <h2>Variation View 02</h2>
      <div>
        <ul>
          <li>Title: {data.title}</li>
          <li>URL: {data.url}</li>
        </ul>
      </div>
    </>
  );
};

export default View;
```

As you can see in this basic example, the variations are pretty much the same.
The only difference is the text that is rendered in the `<h2>` tag.
But it can be anything.

## Block configuration

With all the block components ready, you need to register the block into Volto.

To do so, open your add-on's {file}`index.js` file, and insert the following contents before the last `return config` statement:

```js
  config.blocks.blocksConfig.block05 = {
    id: 'block05', // this is the block id, it must match the id on the previous line
    title: 'Block 05', // this is the block title
    view: View05, // this is the block's view component
    // We do not need a specific edit component, Volto will use the default
    // edit: null,
    blockSchema: Schema05, // this is the schema that will be used to render the edit form
    icon: imagesSVG, // this is the image that will be shown in the block selector
    sidebarTab: 1, // this is set to 1 to have the `Block` tab selected in the sidebar editor when editing this block
    // these are the variations available for this block
    variations: [
      {
        id: 'variation01', // this is the id of the variation
        title: 'Variation 01', // this is the title of the variation
        isDefault: true, // this signals if this is the default variation for this block
        template: VariationView0501, // this is the component that will render the variation
      },
      {
        id: 'variation02',
        title: 'Variation 02',
        isDefault: false,
        template: VariationView0502,
      },
    ],
  };

```

At the top of the file, import the relevant components as follows.

```js
import View05 from './components/ExampleBlock05/View';
import Schema05 from './components/ExampleBlock05/Schema';
import VariationView0501 from './components/ExampleBlock05/VariationView01';
import VariationView0502 from './components/ExampleBlock05/VariationView02';

// This is the icon we use for the example, use a meaningful one or provide your own image.
import imagesSVG from '@plone/volto/icons/images.svg';
```

## See it in action

Your block is ready to be used in your site.

Restart your Volto site, and you can add it using the block add form.
