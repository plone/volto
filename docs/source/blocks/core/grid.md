---
myst:
  html_meta:
    "description": "Volto grid block description and developer notes"
    "property=og:description": "Volto grid block description and developer notes"
    "property=og:title": "Volto grid block"
    "keywords": "Volto, React, blocks, grid, container, Plone"
---

(grid-block)=

# Grid block

```{versionadded} Volto 17.0.0-alpha.16
See {ref}`grid-block-migration-from-kitconcept-volto-blocks-grid-label`.
```

Volto comes with a grid block.
It builds upon the {doc}`container`.
It is a block that contains other blocks.
The grid block uses a fixed horizontal layout with a configurable maximum number of blocks, with a default of four blocks.

The grid block can contain any block type.
However, due to its horizontal alignment and narrow widths of the blocks it contains, the blocks might need additional styling.
For this reason, only four blocks are included by default, namely `slate` (text), `image`, `listing`, and `teaser`.


## Settings

The grid block has the following settings.

`Headline`
:   The headline is a heading that appears above the columns of the grid block.


## Block configuration

The grid block has the following configuration settings.

`templates`
:   When you create a new grid block, it shows the user a list of choices with the initial contents that the block should have.
    By default, it allows the user to choose the number of blocks (columns) that the block will initially contain.
    You can customize the choices providing a function that generates the initial list of choices and the outcome of choosing one option or another.
    It has the following signature: `(type) => (intl) => TemplateData[]`.
    See the file {file}`src/components/manage/Blocks/Grid/template.jsx` for more information.

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

`maxLength`
:   The maximum number of elements allowed inside the grid block.
    The default value is four elements.

`allowedBlocks`
:   Array of block types allowed in the grid block.
    This can be extended to include any of the registered blocks.

`blocksConfig`
:   It allows you to customize the blocks configuration available for the inner blocks.
    You have to pass the whole existing Volto `blocksConfig` of the main configuration, then modify it given your needs, and pass it down.
    You could add different variations, `schemaEnhancers`, and so on.
    You could remove them as well, but only for blocks inside the grid block.

    ```js
    config.blocks.blocksConfig.gridBlock.gridAllowedBlocks: ['teaser', 'image', 'slate'];
    config.blocks.blocksConfig.gridBlock.blocksConfig: {
      // You can customize the blocks inside the grid like this:
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

## Block image styling customization

By default, the images inside a grid block are using a 16/9 aspect ratio.
It is configurable by setting a LESS variable, `@grid-images-aspect-ratio`, or setting a CSS property somewhere in your project, `--grid-images-aspect-ratio`.
There is another setting for the `object-position` CSS definition, `@grid-images-object-position`, and its corresponding `--grid-images-object-position`.

If you want to disable a default setting, then set its value to `unset`.

## Style wrapper properties

The Grid block supports the block styling wrapper but does not provide any property by default.

The styling wrapper properties can be added or extended using the {ref}`block-style-wrapper-label`.


## Variations

The Grid block supports variations, but does not have any by default.
Variations can be added or extended using {ref}`extensions-block-variations`.

## Data adapter

The Grid block has a data adapter function that allows you to both tap into the changes in the settings and issue changes in other settings fields.
This is valuable in the {doc}`teaser` because it saves an internal cache of the target element.
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
