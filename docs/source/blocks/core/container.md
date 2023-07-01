---
myst:
  html_meta:
    "description": "Volto container description and developer notes"
    "property=og:description": "Volto container description and developer notes"
    "property=og:title": "Volto container"
    "keywords": "Volto, React, blocks, container, Plone"
---

(container-label)=

# Container

```{versionadded} Volto 17.0.0-alpha.10
```

A container in Volto is a core component that contains blocks.
A container consists of an Edit component that allows users to add, edit, or delete specific blocks inside the container.


## Building blocks using a container

When building a custom block that uses a container as its base, you must pass your block's properties into the container.


## Container props

The container component has particular properties:

`direction`
:   The arrangement of blocks in the container, either `horizontal` or `vertical`.
    The default value is `horizontal`.

`templateChooser`
:   To complete the full customization of the template choice experience, you can customize the component that shows the choices as well.
    You can enhance the default component located in {file}`src/components/manage/TemplateChooser/TemplateChooser.jsx` by providing your own component.
    You might also need to provide your own custom `templates` function that is compatible with your component.

`editBlockWrapper`
:   You can customize the container's `editBlockWrapper` by providing your own.
    This will be passed to the `BlocksForm` component used by the container.
    It is used to customize the block wrapper if the block that you are building needs to have a different one for the user experience of your block.

`containerToolbar`
:   You can customize the container's control toolbar (the one on the top) by providing your own.

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
