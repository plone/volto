---
myst:
  html_meta:
    "description": "Copy, cut, and paste blocks in Volto, the Plone 6 frontend."
    "property=og:description": "Copy, cut, and paste blocks in Volto, the Plone 6 frontend."
    "property=og:title": "How to copy, cut, and paste Volto blocks"
    "keywords": "Volto, Plone, frontend, React, User manual, edit blocks, copy, cut, paste"
---

(copy-cut-paste-blocks-label)=

# Copy, Cut, and Paste blocks in Volto

Volto supports copying and cutting of blocks from one page, and pasting them to another page.
This chapter describes how to do so.

(copy-cut-blocks-label)=

## Copy/Cut blocks

While in edit mode you can hold {kbd}`ctrl` key to select multiple blocks you want to copy/cut.
Once blocks are selected, you will have a copy <img alt="../_static/copy.svg" src="../_static/copy.svg" class="inline"> and a cut <img alt="../_static/cut.svg" src="../_static/cut.svg" class="inline"> option at the bottom of Toolbar.

Additionally, Volto also has a hidden feature for selecting multiple blocks in sequence.
This feature can be used by selecting a start block and an end block while holding the {kbd}`shift` key.
This will select all the blocks between the start and end blocks, allowing you to copy or delete multiple blocks at once.

```{eval-rst}
.. video:: ../_static/user-manual/blocks/block-copy-cut.mp4
```

(paste-blocks-label)=

## Paste blocks

Once you copy or cut the blocks, you can paste those blocks on that page or some other page.
Select an empty block where you want to paste blocks from the clipboard.
You can see the paste option <img alt="../_static/paste.svg" src="../_static/paste.svg" class="inline"> at the bottom of the toolbar.

Also if you hold the {kbd}`ctrl` key while clicking the paste button, it does not clear the clipboard.

```{eval-rst}
.. video:: ../_static/user-manual/blocks/block-paste.mp4
```