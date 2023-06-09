---
myst:
  html_meta:
    "description": "Volto Container Block primitive description and developer notes"
    "property=og:description": "Volto Container Block primitive description and developer notes"
    "property=og:title": "Volto Container Block primitive"
    "keywords": "Volto, React, blocks, container, primitive, Plone"
---

(container-block-primitive)=

# Container Block Primitive

```{versionadded} Volto 17.0.0-alpha.10
```

Volto comes with a Container Block primitive.
It is __not__ a block by itself, rather than that, it allows to build blocks that contains other blocks.
The Volto Grid block is build using it.
The whole idea of primitive is to use it as "template" and pattern to use it and its internal methods to build blocks that share the same feature: allow the blocks in block container and the management of them.
The blocks build on this primitive will use schema properties (or styling wrapper ones) to provide layout to the containing blocks (horizontal/vertical/spacing/behavior/backgroundColor/...) along with other look and feel properties.

## Block configuration

The Container primitive has these configuration settings:

templates
: It's a function to provide a list of available templates.
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
: The internal `id` of the allowed blocks in the grid block.
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

The Container block primitive supports the block styling wrapper but does not provide any property by default.

The styling wrapper properties can be added/extended using the {ref}`block-style-wrapper-label`.

## Variations

The Container block primitive supports variations but does not have any by default.
Variations can be added/extended using {ref}`extensions-block-variations`.
