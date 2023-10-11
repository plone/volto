---
myst:
  html_meta:
    'description': 'Volto leadme block description and developer notes'
    'property=og:description': 'Volto leadme block description and developer notes'
    'property=og:title': 'Volto leadme block'
    'keywords': 'Volto, React, blocks, leadme, container, Plone'
---

(leadimage-block)=

# Lead image block

Volto comes with a lead image block that builds upon the Image component.

By default the lead image block comes with a configuration that lets the end user to select where to show the image (aligned to the left, right or the center)

Depending the selected configuration it configures the Image component to use one or another `sizes` configuration for instructing the browser which image to download.

This is achieved thanks to the `srcset` and `sizes` option of the Image block.

The developer may set a different function in the Image block configuration to decide which sizes to show.

This can be achieved passing a custom function in the `getSizes` option of the block configuration:

```js
  const myCustomImageBlockSizes = (data) => {
    return '25vw';
  }


  settings.blocks.leadimage: {
    getSizes: myCustomImageBlockSizes,
  },
```
