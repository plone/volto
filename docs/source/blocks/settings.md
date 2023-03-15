---
myst:
  html_meta:
    "description": "How to configure custom blocks"
    "property=og:description": "How to configure custom blocks"
    "property=og:title": "Blocks settings"
    "keywords": "Volto, Plone, frontend, React, Block settings"
---

# Blocks settings

You should make Volto aware of your custom blocks.
Since Volto have its own set of default blocks, you should extend them by adding your custom ones in your project configuration object.

## Configuring a new block

So we add these lines to the `src/config.js`:

```js
import MainSliderViewBlock from '@package/components/Blocks/MainSlider/View';
import MainSliderEditBlock from '@package/components/Blocks/MainSlider/Edit';
import sliderSVG from '@plone/volto/icons/slider.svg';

import SimpleTeaserView from '@package/components/Blocks/SimpleTeaserView';
import CardTeaserView from '@package/components/Blocks/CardTeaserView';
import DefaultColumnRenderer from '@package/components/Blocks/DefaultColumnRenderer';
import NumberColumnRenderer from '@package/components/Blocks/NumberColumnRenderer';
import ColoredColumnRenderer from '@package/components/Blocks/ColoredColumnRenderer';

import CustomSchemaEnhancer from '@package/components/Blocks/CustomSchemaEnhancer';

[...]

const customBlocks = {
  mainslider: {
    id: 'mainslider', // The name (id) of the block
    title: 'Main Slider', // The display name of the block
    icon: sliderSVG, // The icon used in the block chooser
    group: 'common', // The group (blocks can be grouped, displayed in the chooser)
    view: MainSliderViewBlock, // The view mode component
    edit: MainSliderEditBlock, // The edit mode component
    restricted: false, // {Boolean|function} If the block is restricted, it won't show in the chooser. The function signature is `({properties, block})` where `properties` is the current object data and `block` is the block being evaluated in `BlockChooser`.
    mostUsed: true, // A meta group `most used`, appearing at the top of the chooser
    blockHasOwnFocusManagement: false, // Set this to true if the block manages its own focus
    sidebarTab: 0, // The sidebar tab you want to be selected when selecting the block
    blockHasValue: (data) => {
      // Returns true if the provided block data represents a value for the current block.
      // Required for alternate default block types implementations.
      // See also [Settings reference](/configuration/settings-reference)
    },
    // A block can have an schema enhancer function with the signature: (schema) => schema
    // It can be either be at block level (it's applied always), at a variation level
    // or both. It's up to the developer to make them work nicely (not conflict) between them
    schemaEnhancer: CustomSchemaEnhancer,
    // A block can define variations (it should include the stock, default one)
    variations: [
      {
        id: 'default',
        title: 'Default',
        isDefault: true,
        render: SimpleTeaserView
      },
      {
        id: 'card',
        label: 'Card',
        render: CardTeaserView,
        schemaEnhancer: ({schema, formData, intl}) => {
          schema.properties.cardSize = '...'; // fill in your implementation
          return schema;
        }
      }
    ],
    // A block can define extensions that enhance the default stock block behavior
    extensions: {
      columnRenderers: {
        title: messages.title,
        items: [
          {
            id: 'default',
            title: 'Default',
            isDefault: true,
            render: DefaultColumnRenderer
          },
          {
            id: 'number',
            title: 'Number',
            render: NumberColumnRenderer,
          },
          {
            id: 'colored',
            title: 'Colored',
            renderer: ColoredColumnRenderer,
            schemaEnhancer: ({formData, schema, intl}) => {
              schema.properties.color = {
                widget: 'color',
                title: 'Color',
              };
              schema.fieldsets[0].fields.push('color');
              return schema;
            }
          }
        ]
      }
    }
  },
};

export const blocks = {
  ...defaultBlocks,
  blocksConfig: { ...defaultBlocks.blocksConfig, ...customBlocks },
};
```

We start by importing both view and edit components of our recently created custom block.

```{note}
Notice the `@package` alias.
You can use it when importing modules/components from your own project.
```

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

## Listing block configuration

`allowed_headline_tags`
: Allows you to customize the choices of the "Headline Tag" types shown in the block settings by default. It has the following syntax (a list of lists, where a list item consists of `['token', 'display_name']`):

  ```js
  allowed_headline_tags: [['h2', 'h2'], ['h3', 'h3']]
  ```

  If not specified, an internal hardcoded default is the above shown example.

  If the choice is limited to one item, then the setting hides itself from the `listing` block settings list.

## Search block configuration

The search block provides several extensibility options.

### Variations

The search block uses the variations to provide alternate layout.

### FacetWidgets rewriteOptions extension

Sometimes the labels provided by a field are not directly usable in UI. You can
override the `rewriteOptions` function. Don't be alarmed by the facet that's
already filled in to handle `review_state`. You can save a reference to the
current function and define a new function that handles another field, that
also calls the old saved function.

### FacetWidgets types

This allows definition of new facet filtering widgets. In addition to the
`view` field, which defines the component to be used to render the facet
widget, you need to also set:

- `schemaEnhancer`: a schema extender for the object list widget that's used to
  edit each facet setting
- `stateToValue`: a function to convert the state (extracted from URL) to
  a value that can be used in the facet widget
- `valueToQuery`: a function that converts the value of the widget to state,
  something that can be used to compose the querystring query
- `filterListComponent`: component to be used in the filter list display of
  that facet.
