---
myst:
  html_meta:
    "description": "Volto blocks are composed of an edit and a view component."
    "property=og:description": "Volto blocks are composed of an edit and a view component."
    "property=og:title": "Blocks anatomy"
    "keywords": "Volto, React, blocks, edit, view, Plone"
---

# Blocks anatomy

Every block is composed of a view ({file}`View.jsx`) component and optionally an edit ({file}`Edit.jsx`) component.

These components can be as simple as a dummy component, no boilerplate is required.
The following code is an example of an {file}`Edit.jsx` file.

```jsx
import React from 'react';

const Edit = props => {
  return <div>I am the Block edit component!</div>;
};

export default Edit;
```

The following code is an example of a {file}`View.jsx` file.

```jsx
import React from 'react';

const View = props => {
  return <div>I am the Block view component!</div>;
};

export default View;
```

## Block view component props

The view component of a block receives these props from the Blocks Engine:

- `id` - the unique ID for the current block
- `properties` - the current content
- `data` - the data of the block (stored in the block itself)
- `blocksConfig` - a (potentially customized) copy of the `config.blocks.blocksConfig` configuration object, useful for blocks that need to render other blocks

You can use them to render the view component.


(block-edit-component-props-label)=

## Block edit component props

The edit component of a block receives these props from the Blocks Engine:

- `type` - the type of the block
- `id` - the unique ID for the current block
- `data` - the data of the block (stored in the block itself)
- `selected` - (Bool) true if the block is currently selected
- `index` - the block index order in the list of blocks
- `pathname` - the current URL pathname
- `onAddBlock` - handler for adding a block in the block list
- `onMutateBlock` - handler for mutating a block type into another
- `onChangeBlock` - handler for changing the data of that block
- `onSelectBlock` - handler for selecting the block
- `onDeleteBlock` - handler for deleting the block
- `onFocusPreviousBlock` - handler for focusing the previous block in the block list
- `onFocusNextBlock` - handler for focusing the next block in the block list
- `handleKeyDown` - handler for managing press keys while the block is selected
- `onMoveBlock` - handler for moving blocks
- `blocksConfig` - a (potentially customized) copy of the `config.blocks.blocksConfig` configuration object, useful for blocks that need to render other blocks

You can use all these props to render your edit block and model its behavior.

## Default block edit and view components

Volto later than 16.0.0 ships with a set of default edit and view components.
The view component is mostly a placeholder, with an auto-generated listing of the block fields.
The default edit component is the most interesting, as it can use the `blockSchema` that you can specify in the block configuration to automatically render a form for the block's settings in the Volto sidebar.
In the main editing area, it will render the view component, so for many blocks you can just develop a schema and the view component.

To use the default edit or view component, don't set any value in the
block configuration.

```js
config.blocks.blocksConfig.myBlock = {
  id: 'myBlock',
  title: 'My block',
  edit: null, // or omit it
  view: null, // or omit it
  // ... the rest of the settings
};
```
