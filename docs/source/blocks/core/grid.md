---
myst:
  html_meta:
    "description": "Volto Grid Block description and developer notes"
    "property=og:description": "Volto Grid Block description and developer notes"
    "property=og:title": "Volto Grid Block"
    "keywords": "Volto, React, blocks, grid, container, Plone"
---

(grid-block)=

# Grid Block

```{versionadded} Volto 17.0.0-alpha.10
```

Volto comes with a Grid block, it is a block that contains other blocks.
The Grid block uses a fixed horizontal layout with a configurable maximum items per block, defaulting to four elements.

The Grid block can potentially contain any block type. However, the used blocks might need some styling work to adapt to the horizontal and small widths in the container. For this reason, only these four are included by default: `slate` (text), `image`, `listing` and `teaser`.

## Settings

The Grid has the following settings:

Headline
: The headline is a heading that appears above the columns of the Grid Block.

## Block configuration

The Grid block has these configuration settings:

templates
: When you create a new Grid block, it shows the user a list of choices with the initial contents the block should have.
By default, it allows the user to choose how many blocks (columns) the block will contain initially.
One can customize the choices providing a function that generates the initial list of choices and the outcome of choosing one option or another.
It has the following signature: (type) => (intl) => TemplateData[]
See the `src/components/manage/Blocks/Grid/template.jsx` for more info.
```ts
type TemplateData = {
    image: Icon,
    id: string,
    title: string,
    blocksData: BlocksData,
}

type BlocksData = {
  blocks: {
    [key: string]: object;
  };
  blocks_layout: {
    items: string[];
  };
};
```

maxLength
: The maximum elements length allowed inside the grid block.
By default is four elements.

allowedBlocks
: Array of block types allowed in the grid block.
This can be extended to include any of the registered blocks

blocksConfig
: It allows you to customize the blocks config available for the inner blocks.
You have to pass the whole existing Volto `blocksConfig` of the main configuration, then modify it given your needs and pass it down.
You could add different variations, schemaEnhancers, etc or remove them as well but only for blocks inside the grid block.
```js
config.blocks.blocksConfig.gridBlock.gridAllowedBlocks: ['teaser', 'image', 'slate'];
config.blocks.blocksConfig.gridBlock.blocksConfig: {
  // One could customize the blocks inside the grid like this:
  ...config.blocks.blocksConfig,
  teaser: {
    ...config.blocks.blocksConfig.teaser,
    variations: [
      {
        id: 'default',
        isDefault: true,
        title: 'Default',
        template: DefaultBody,
      },
      {
        id: 'variation2',
        title: 'variation #2',
        template: DefaultBody2,
      },
    ],
  },
};
```

## Style wrapper properties

The Grid block supports the block styling wrapper but does not provide any property by default.

The styling wrapper properties can be added/extended using the {ref}`block-style-wrapper-label`.

## Variations

The Grid block supports variations but does not have any by default.
Variations can be added/extended using {ref}`extensions-block-variations`.

## Data adapter

The Grid block has a data adapter function that allows you to both tap into the changes in the settings and issue changes in other settings fields.
This is valuable in the Teaser block because it saves an internal cache of the target element.
If you select the target, these values are updated.
When you update the target, by default these values remain, but you can issue another behavior.

The data adapter function is defined in the block's setting `dataAdapter`.
You can override it and add your own function, if required.
The following is the default adapter.
You should stick to this signature in your custom adapters.

```js
import { isEmpty } from 'lodash';

export const GridBlockDataAdapter = ({
  block,
  data,
  id,
  onChangeBlock,
  value,
}) => {
  let dataSaved = {
    ...data,
    [id]: value,
  };
  if (id === 'href' && !isEmpty(value) && !data.title && !data.description) {
    dataSaved = {
      ...dataSaved,
      title: value[0].Title,
      description: value[0].Description,
      head_title: value[0].head_title,
    };
  }
  onChangeBlock(block, dataSaved);
};
```

## Migration from `@kitconcept/volto-blocks-grid`

The Grid block was included in Volto core starting from Volto 17.0.0-alpha.10. It is based on the `@kitconcept/volto-blocks-grid` add-on version 7.x.x.

The Volto core Grid is using the Volto internals default blocks-in-block architecture.
Because of that, they both store the data differently, being incompatible and a migration of data is needed.

However, the Volto core Grid block is using another internal name (`gridBlock`) so both blocks can coexist at the same time.
It is recommended to enable only one for your users, and eventually only use one version to avoid unexpected behaviors and bugs.
