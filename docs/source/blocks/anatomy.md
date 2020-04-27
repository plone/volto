# Blocks anatomy

Every blocks is composed of an edit (`Edit.jsx`) and a view (`View.jsx`) component.

This components can be as simple as a dummy component, no boilerplate is required.
This is an example of the `Edit.jsx`:

```js
import React from 'react';

const Edit = props => {
  return <div>I'm the Block edit component!</div>;
};

export default Edit;
```

and the `View.jsx`.

```js
import React from 'react';

const View = props => {
  return <div>I'm the Block view component!</div>;
};

export default View;
```

## Block view component props

The view component of a block receives these props from the Blocks Engine:

- id - the unique ID for the current block
- properties - the current content
- data - the data of the block (stored in the block itself)

You can use them to render the view component.

## Block edit component props

The edit component of a block receives these props from the Blocks Engine:

- type - the type of the block
- id - the unique ID for the current block
- data - the data of the block (stored in the block itself)
- selected - (Bool) true if the block is currently selected
- index - the block index order in the list of blocks
- pathname - the current URL pathname
- onAddBlock - handler for adding a block in the block list
- onMutateBlock - handler for mutating a block type into another
- onChangeBlock - handler for changing the data of that block
- onSelectBlock - handler for selecting the block
- onDeleteBlock - handler for deleting the block
- onFocusPreviousBlock - handler for focusing the previous block in the block list
- onFocusNextBlock - handler for focusing the next block in the block list
- handleKeyDown - handler for managing press keys while the block is selected
- onMoveBlock - handler for moving blocks

You can use all these props to render your edit block and model its behavior.
