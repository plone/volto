---
myst:
  html_meta:
    "description": "User manual for how to edit blocks in Volto, the Plone 6 frontend."
    "property=og:description": "User manual for how to edit blocks in Volto, the Plone 6 frontend."
    "property=og:title": "How to edit content using Volto blocks"
    "keywords": "Volto, Plone, frontend, React, User manual, edit blocks"
---

# Edit content using blocks

```{todo}
This page needs content
```

Volto features the [Pastanaga UI](https://github.com/plone/pastanaga), allowing you to visually compose a page using blocks.
The blocks editor allows you to add, modify, reorder, and delete blocks given your requirements.
Blocks provide the user the ability to display content in a specific way, although they can also define behavior and have specific features.

## Choose a pre-built block type

```{todo}
Add description of a Volto block.
```

Volto offers several default block types out of the box.
You can access and choose a block type to add to your content type when you have an empty block in it.

To create an empty block after an existing block, click in the block, then hit the {kbd}`Enter` key.
A new empty block appears.

```{image} ../_static/user-manual/blocks/add_new_block.gif
:alt: add new block
```

```{note}
There is a new experimental feature that places a `+` below every block in a content type.

See https://github.com/plone/volto/pull/3815 for details of the feature and how to enable it.
```

Now with your empty block available, you can select its type in one of two ways.
1.  Click the `+` button on the left-hand side of the empty block.
    ```{image} ../_static/user-manual/blocks/block_left_plus_icon.png
    :alt: Plus button
    ```
2. Type `/` inside empty block to open the blocks menu.
    ```{image} ../_static/user-manual/blocks/blocks_type_menu.png
    :alt: Types of blocks menu
    ```


(user-manual-description-block-label)=

## Description Block

A description block provides a blank textarea to write plain text.

(user-manual-grid-block-label)=

## Grid Block

(user-manual-html-block-label)=

## HTML Block

(user-manual-hero-block-label)=

## Hero Block

(user-manual-image-block-label)=

## Image Block

(user-manual-images-grid-block-label)=

## Images grid Block

(user-manual-listing-block-label)=

## Listing Block

(user-manual-maps-block-label)=

## Maps Block
