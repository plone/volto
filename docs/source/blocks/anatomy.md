# Blocks anatomy

Every blocks is composed of an edit (`Edit.jsx`) and a view (`View.jsx`) component.

This components can be as simple as a dummy component, no boilerplate is required.
This is an example of the `Edit.jsx`:

```jsx
import React from 'react';

const Edit = props => {
  return <div>I'm the Block edit component!</div>;
};

export default Edit;
```

and the `View.jsx`.

```jsx
import React from 'react';

const View = props => {
  return <div>I'm the Block view component!</div>;
};

export default View;
```

## Block view component props

The view component of a block receives these props from the Blocks Engine:

- `id` - the unique ID for the current block
- `properties` - the current content
- `data` - the data of the block (stored in the block itself)
- `blocksConfig` - a (potentially customized) copy of the
  `config.blocks.blocksConfig` configuration object, useful for blocks that
  need to render other blocks

You can use them to render the view component.

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
- `blocksConfig` - a (potentially customized) copy of the
  `config.blocks.blocksConfig` configuration object, useful for blocks that
  need to render other blocks

You can use all these props to render your edit block and model its behavior.

## Variations

A block can define variations in the block configuration. These variations can be used to enhance or complement the default behavior of a block without having to shadow its stock components. These enhancements can be at a settings level (add or remove block settings) via schema enhancers or, if the code of your block allows it, even use alternative renderers (eg. in view mode) showing the enhanced fields or modifying the block look and feel or behavior.

The Listing block already supports several of them (only in the "template" or the component to show on view mode), and can be extended, although it still do not use the final specification on how to define them in the configuration, although that will change in next Volto versions.

The rest of the stock Volto blocks will also follow to support variations by default.

### How to make your block variations aware

In order for a block to support variations you have to use the recommended way of generating a block settings, using a [schema driven](./editcomponent.md#schema-driven-automated-block-settings-forms) `BlockDataForm` component in your data settings block component.

`BlockDataForm` detects if your block has [variations configuration](./settings.md#configuring-a-new-block) and applies the schema enhancers (if any) and shows the variation selector automatically.

See the [block extensions](./editcomponent.md) chapter for more details.
