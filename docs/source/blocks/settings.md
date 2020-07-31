# Blocks settings

You should make Volto aware of your custom blocks.
Since Volto have its own set of default blocks, you should extend them by adding your custom ones in your project configuration object.

## Configuring a new block

So we add these lines to the `src/config.js`:

```js
import MainSliderViewBlock from '@package/components/Blocks/MainSlider/View';
import MainSliderEditBlock from '@package/components/Blocks/MainSlider/Edit';
import sliderSVG from '@plone/volto/icons/slider.svg';

[...]

const customBlocks = {
  mainslider: {
    id: 'mainslider', // The name (id) of the block
    title: 'Main Slider', // The display name of the block
    icon: sliderSVG, // The icon used in the block chooser
    group: 'common', // The group (blocks can be grouped, displayed in the chooser)
    view: MainSliderViewBlock, // The view mode component
    edit: MainSliderEditBlock, // The edit mode component
    restricted: false, // If the block is restricted, it won't show in the chooser
    mostUsed: true, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 0, // The sidebar tab you want to be selected when selecting the block
    security: {
      addPermission: [], // Future proof (not implemented yet) add user permission role(s)
      view: [], // Future proof (not implemented yet) view user role(s)
    },
    blockHasValue: (data) => {
      // Returns true if the provided block data represents a value for the current block. 
      // Required for alternate default block types implementations. 
      // See also [Settings reference](/configuration/settings-reference)
    },
  },
};

export const blocks = {
  ...defaultBlocks,
  blocksConfig: { ...defaultBlocks.blocksConfig, ...customBlocks },
};
```

We start by importing both view and edit components of our recently created custom block.

!!! note
    Notice the `@package` alias.
    You can use it when importing modules/components from your own project.

Then you define the block, using the object described in the example.

We also add this piece of code in order to define i18n literals for our new block:

```js
import { defineMessages } from 'react-intl';

...

defineMessages({
  mainslider: {
    id: 'Main Slider',
    defaultMessage: 'Main Slider',
  },
});
```

Our new block should be ready to use in the editor.

## Other block options

The configuration object also exposes these options

### requiredBlocks - The required (mandatory, cannot be removed) blocks

This option is used to make the tiles not removable. By default, the Title block is not removable (you won't be able to delete it as the remove handler is not present).

### groupBlocksOrder - The blocks chooser group order

This option is used to define the order of the groups in the blocks chooser. By default:

```js
const groupBlocksOrder = [
  { id: 'mostUsed', title: 'Most used' },
  { id: 'text', title: 'Text' },
  { id: 'media', title: 'Media' },
  { id: 'common', title: 'Common' },
];
```

You can change it (and add your own group) in your project configuration object.

### initialBlocks - Initial Blocks per content type

By default, the default blocks for all content types are a title block and a text block. You can override this and provide your own by modifying the configuration object:

```js
const initialBlocks = {};
```

and provide your own per content type, e.g:

```js
const initialBlocks = {
    Document: ['leadimage', 'title', 'text', 'listing' ]
};
```
