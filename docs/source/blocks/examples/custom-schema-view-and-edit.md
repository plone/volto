---
myst:
  html_meta:
    "description": "Volto block with custom schema, view and edit components"
    "property=og:description": "Volto block with custom schema, view and edit components"
    "property=og:title": "Volto block with custom schema, view and edit components"
    "keywords": "Volto, React, blocks, grid, container, Plone"
---

(custom-schema-edit-and-view)=

# Block with a custom schema and edit components

You can create a block with several settings defined using a schema, and write a custom edit form instead of using the one provided by Volto.

To do so, define the schema, the view component, the edit component, and configure the block settings.

## Preparations

In your Volto add-on, create a subfolder {file}`ExampleBlock03` inside the {file}`components` folder to save all the files required to create a block.

## Schema

Create a {file}`Schema.js` file inside the {file}`ExampleBlock03` folder, with the following contents.

```js
import messages from './messages';

const Schema = ({ intl }) => {
  return {
    title: intl.formatMessage(messages.block03),
    block: 'block03',
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
To add translatable messages, create a file {file}`messages.js` in the same {file}`ExampleBlock02` folder with the following contents.

```js
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  block03: {
    id: 'block03',
    defaultMessage: 'Block 03',
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

Create a file {file}`View.jsx` in the {file}`ExampleBlock03` folder with the following contents.

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

## Edit component

The Edit component needs to render a form where the editor can change the block settings.

This Edit component is a minimal component that renders the block and the same edit form as the one rendered automatically.

Create a file {file}`Edit.jsx` in the {file}`ExampleBlock03` folder with the following contents:

```jsx

// We manually import the schema
import schema from './Schema';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';
import { SidebarPortal } from '@plone/volto/components';
// The Edit component needs to render also the view of the block, not only the form
// So we import the View component that we have just written to render its contents
import View from './View';


const Edit = (props) => {
  const { onChangeBlock, block, data, selected, className, style } = props;

  // The schema is a function, so we call it to have the definition
  const blockSchema = schema(props);

  return (
    <>
      <View data={data} className={className} style={style}/>

      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={blockSchema}
          title={blockSchema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
```

## Block configuration

With all the block components ready, you need to register the block into Volto.

To do so, open your add-on's {file}`index.js` file, and insert the following contents before the last `return config` statement:

```js
config.blocks.blocksConfig.block03 = {
    id: 'block03', // this is the block id, it must match the id on the previous line
    title: 'Block 03', // this is the block title
    view: View02, // this is the block's view component
    edit: Edit03, // this is the block's edit component
    // We do not need to define the schema here,
    // because we are using a custom edit component
    // blockSchema: Schema03,

    // this is the image that will be shown in the block selector
    icon: imagesSVG,
    // this is set to 1 to have the `Block` tab selected in the sidebar editor
    // when editing this block
    sidebarTab: 1,
  };
```

At the top of the file, import the relevant components as follows.

```js
import View03 from './components/ExampleBlock03/View';
import Edit03 from './components/ExampleBlock03/Edit';
import Schema03 from './components/ExampleBlock03/Schema';

// This is the icon we use for the example, use a meaningful one or provide your own image.
import imagesSVG from '@plone/volto/icons/images.svg';
```

## See it in action

Your block is ready to be used in your site.

Restart your Volto site, and now you can add the new block from the block chooser found in the `edit` or `add` new content views.
