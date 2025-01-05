---
myst:
  html_meta:
    "description": "Volto block with custom schema and view components using variations and a schema enhancer in one of the variations"
    "property=og:description": "Volto block with custom schema and view components using variations and a schema enhancer in one of the variations"
    "property=og:title": "Volto block with custom schema, variations, and schema enhancer"
    "keywords": "Volto, React, blocks, variation, custom, schema, enhancer, Plone"
---

(custom-schema-view-variations-schema-enhancer)=

# Block with a custom schema, variations, and a schema enhancer in a variation

This example builds upon the previous example, {doc}`custom-view-and-variations`, where you can create a block with a custom schema, variations, and a schema enhancer in one of the variations.
A {term}`variation` is an alternative view of a block.
The variation is shown as an additional option in the schema editor, and lets the editor change how this block is viewed.

A {term}`schema enhancer` is an option of a variation.
Using this schema enhancer, you can extend the block schema to have additional fields.

To do so, define the schema, view component, variations, and schema enhancer, then configure the block settings.

## Preparations

In your Volto add-on, create a subfolder {file}`ExampleBlock04` inside the {file}`components` folder to save all the files required to create a block, its variations and the schema enhancer.


## Schema

Create a {file}`Schema.js` file inside the {file}`ExampleBlock04` folder, with the following contents.

```js
import messages from './messages';

const Schema = ({ intl }) => {
  return {
    title: intl.formatMessage(messages.block04),
    block: 'block04',
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

Create a file {file}`messages.js` in the same {file}`ExampleBlock04` folder with the following contents.

```js
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  block04: {
    id: 'block04',
    defaultMessage: 'Block 04',
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
  color: {
    id: 'color',
    defaultMessage: 'Color',
  }
});

export default messages;
```

## View component

For variations, the view component needs to use the variation template to render the contents of the block.

You can do so using the `variation` from the `props` of the block.

Create a file {file}`View.jsx` in the {file}`ExampleBlock04` folder with the following contents.

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
        'block04',
        `block04-variation-${variation?.id}`,
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

## Schema enhancer

Next you need to configure the schema enhancer function.
In this example, you will add a new field named `color` when using `schemaEnhancerVariation02`.

Create a file {file}`enhancers.js` in the {file}`BlockSchema04` folder with the following content:

```js

import messages from './messages';

const schemaEnhancerVariation02 = ({ formData, schema, intl }) => {
  // schema holds the original schema (see the Schema.js file)
  // so you need to define the new property under `schema.properties`
  // and push its name to the relevant fieldset, in this case the first one (note the `fieldsets[0]`)
  schema.properties.color = {
    title: intl.formatMessage(messages.color),
  };
  schema.fieldsets[0].fields.push('color');
  return schema;
};

export default schemaEnhancerVariation02;

```

## Variations

Next create one or more variations that will be available for this block.

Create a file {file}`VariationView01.jsx` in the {file}`ExampleBlock04` folder with the following contents.

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

Create a file {file}`VariationView02.jsx` in the {file}`ExampleBlock04` folder with the following contents.

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
          <li>Color: {data.color}</li>
        </ul>
      </div>
    </>
  );
};

export default View;
```

As you can see, the variations are pretty much the same.
The differences are the text that is rendered in the `<h2>` tag and that we are showing the new field added by the schema enhancer.
But it can be anything.

## Block configuration

With all the block components ready, you need to register the block into Volto.

To do so, open your add-on's {file}`index.js` file, and insert the following contents before the last `return config` statement:

```js
  config.blocks.blocksConfig.block04 = {
    id: 'block04', // this is the block id, it must match the id on the previous line
    title: 'Block 04', // this is the block title
    view: View04, // this is the block's view component
    // We do not need a specific edit component, Volto will use the default
    // edit: null,
    blockSchema: Schema04, // this is the schema that will be used to render the edit form
    icon: imagesSVG, // this is the image that will be shown in the block selector
    sidebarTab: 1, // this is set to 1 to have the `Block` tab selected in the sidebar editor when editing this block
    // these are the variations available for this block
    variations: [
      {
        id: 'variation01', // this is the id of the variation
        title: 'Variation 01', // this is the title of the variation
        isDefault: true, // this signals if this is the default variation for this block
        template: VariationView0401, // this is the component that will render the variation
      },
      {
        id: 'variation02',
        title: 'Variation 02',
        isDefault: false,
        template: VariationView0402,
        schemaEnhancer: schemaEnhancerBlock04Variation02, // this is the schema enhancer definition
      },
    ],
  };
```

At the top of the file, import the relevant components as follows.

```js
import View04 from './components/ExampleBlock04/View';
import Schema04 from './components/ExampleBlock04/Schema';
import VariationView0401 from './components/ExampleBlock04/VariationView01';
import VariationView0402 from './components/ExampleBlock04/VariationView02';
import schemaEnhancerBlock04Variation02 from './components/ExampleBlock04/enhancers';

// This is the icon we use for the example, use a meaningful one or provide your own image.
import imagesSVG from '@plone/volto/icons/images.svg';
```

## See it in action

Your block is ready to use in your site.

Restart your Volto site, and you can add it using the block add form.
