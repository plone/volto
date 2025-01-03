---
myst:
  html_meta:
    "description": "Volto block with custom schema and view components using variations and a schema enhancer in one of the variations"
    "property=og:description": "Volto block with custom schema and view components using variations and a schema enhancer in one of the variations"
    "property=og:title": "Volto block with custom schema, variations and schema enhancer"
    "keywords": "Volto, React, blocks, grid, container, Plone"
---

(custom-schema-view-variations-schema-enhancer)=

# Block with a custom schema, variations and a schema enhancer in a variation.

We can create a block that uses `variations`. A {term}`variation` is an alternative view of a block. This variation is shown as an additional option in the schema editor and lets the webmaster to change how this block is viewed. Think of it as a different view of the same block.

A {term}`schema enhancer` is an option of a variation. Using this schema enhancer, the block schema can be extended to have additional fields.

What we need to do is to define the schema, the view component, the variations, the schema enhancer and configure the block settings.

## Preparations

In your volto addon, create a folder inside the {file}`components` folder to save all the files required to create a block.

Name this folder as {file}`ExampleBlock06`.

## Schema

Create a {file}`Schema.js` file inside the {file}`ExampleBlock06` folder, with the following contents:

```js
import messages from './messages';

const Schema = ({ intl }) => {
  return {
    title: intl.formatMessage(messages.block06),
    block: 'block06',
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

So we need a file {file}`messages.js` in the same {file}`ExampleBlock06` folder with the following contents:

```js
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  block06: {
    id: 'block06',
    defaultMessage: 'Block 06',
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

In this case, as we are using variations, the view component needs to use the variation template to render the contents of the block.

This is easily achieved using the `variation` coming on the `props` of the block.

Create a file {file}`View.jsx` in the {file}`ExampleBlock06` folder with the following contents:

```jsx
import withBlockExtensions from '@plone/volto/helpers/Extensions/withBlockExtensions';
import cx from 'classnames';
import React from 'react';

const View = (props) => {
  // data holds the values entered in the block edit form
  // className holds the CSS class names injected to this block by Volto's `styleClassNameExtenders`
  // style holds the CSS properties injected to this block by Volto's `Block Sytle Wrapper`
  // variation holds the variation selected in the block editor, and it is an object as defined in the block configuration
  const { data, className, style, variation } = props;

  const BodyTemplate = variation?.template;

  return (
    <div
      className={cx(
        'block',
        'block06',
        `block06-variation-${variation?.id}`,
        className,
      )}
      style={style}
    >
      <BodyTemplate data={data} />
    </div>
  );
};

// the `withBlockExtensions` HOC, makes the variation selector available in the block edit form
// and provides the `variation` property in the props.
export default withBlockExtensions(View);
```

## Schema enhancer

We need to configure the schema enhancer function. In this case we will be adding a new field named `color` when using the Variation 2.

Create a file {file}`enhancers.js` in the {file}`BlockSchema` folder with the following content:

```js
const schemaEnhancerVariation02 = ({ formData, schema, intl }) => {
  // schema holds the original schema (see the Schema.js file)
  // so we need to define the new property under `schema.properties`
  // and push its name to the relevant fieldset, in our case the first one (note the `fieldsets[0]`)
  schema.properties.color = {
    title: 'Color',
  };
  schema.fieldsets[0].fields.push('color');
  return schema;
};

export default schemaEnhancerVariation02;

```

## Variations

Now we need to create one or more variations that will be available for this block.

Create a file {file}`VariationView01.jsx` in the {file}`ExampleBlock06` folder with the following contents:

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
Create a file {file}`VariationView02.jsx` in the {file}`ExampleBlock06` folder with the following contents:

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

As you can see, in this case the variations are pretty much the same, the only difference is the text that is rendered in the `<h2>` tag. But it can be anything.

## Block configuration

With all the block components ready, you need to register the block into Volto.

To do so, open your add-on's {file}`index.js` file, and add the following contents.

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
  config.blocks.blocksConfig.block06 = {
    id: 'block06', // this is the block id, it must match the id on the previous line
    title: 'Block 06', // this is the block title
    view: View06, // this is the block's view component
    //edit: Edit05,
    blockSchema: Schema06, // this is the schema that will be used to render the edit form
    icon: imagesSVG, // this is the image that will be shown in the block selector
    sidebarTab: 1, // this is set to 1 to have the `Block` tab selected in the sidebar editor when editing this block
    // these are the variations available for this block
    variations: [
      {
        id: 'variation01', // this is the id of the variation
        title: 'Variation 01', // this is the title of the variation
        isDefault: true, // this signals if this is the default variation for this block
        template: VariationView0601, // this is the component that will render the variation
      },
      {
        id: 'variation02',
        title: 'Variation 02',
        isDefault: false,
        template: VariationView0602,
        schemaEnhancer: schemaEnhancerBlock06Variation02, // this is the schema enhancer definition
      },
    ],
  };

```

On the top of the file you will need to import the relevant components, as follows:

```js
import View06 from './components/ExampleBlock06/View';
import Schema06 from './components/ExampleBlock06/Schema';
import VariationView0601 from './components/ExampleBlock06/VariationView01';
import VariationView0602 from './components/ExampleBlock06/VariationView02';
import schemaEnhancerBlock06Variation02 from './components/ExampleBlock06/enhancers';

// This is the icon we use for the example, use a meaningful one or provide your own image.
import imagesSVG from '@plone/volto/icons/images.svg';
```

## See it in action

Your block is ready to be used in your site.

Restart your Volto site and you will be able to add it using the block add form.
