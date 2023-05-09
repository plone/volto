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

## Copy or cut blocks

While in edit mode, you can hold the {kbd}`ctrl` key to select multiple blocks that you want to copy or cut.
Once blocks are selected, you will have copy <img alt="Copy icon" src="../_static/copy.svg" class="inline"> and cut <img alt="Cut icon" src="../_static/cut.svg" class="inline"> options in the toolbar.

Volto also allows the selection of multiple contiguous blocks.
This feature can be used by selecting a start block and an end block while holding the {kbd}`shift` key.
This will select all the blocks between the start and end blocks, allowing you to copy, cut, or delete multiple blocks at once.

```{video} /_static/user-manual/blocks/block-copy-cut.mp4
```


(paste-blocks-label)=

## Paste blocks

Once you copy or cut the blocks, you can paste those blocks on that page or some other page.
Select an empty block where you want to paste blocks from the clipboard.
You can click the paste option <img alt="Paste icon" src="../_static/paste.svg" class="inline"> in the toolbar.

Also if you hold the {kbd}`ctrl` key while clicking the paste button, it keeps the clipboard buffer, allowing you to repeatedly paste it.

```{video} /_static/user-manual/blocks/block-paste.mp4
```
