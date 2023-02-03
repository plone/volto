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

While in edit mode you can hold <kbd>ctrl</kbd> key to select multiple blocks you want to copy/cut.
Once blocks are selected, you will have a copy <i class="fas fa-copy"></i> and a cut <i class="fas fa-cut"></i> option at the bottom of Toolbar.

Additionally, Volto also has a hidden feature for selecting multiple blocks in sequence.
This feature can be used by selecting a start block and an end block while holding the <kbd>shift</kbd> key.
This will select all the blocks between the start and end block, allowing you to copy or delete multiple blocks at once.

```{image} ../_static/user-manual/blocks/block-copy-cut.gif
:alt: Select and Copy/Cut blocks
```

(paste-blocks-label)=

## Paste blocks

Once you copy/cut the blocks you can paste those blocks on that page or some other page.
Select an empty block where you want to paste blocks from clipboard.
You can see the paste option <i class="fas fa-clipboard"></i> at the bottom of Toolbar.

Also, in addition if you hold <kbd>ctrl</kbd> key while clicking the paste button, it does not clear the clipboard.

```{image} ../_static/user-manual/blocks/block-paste.gif
:alt: Paste blocks
```