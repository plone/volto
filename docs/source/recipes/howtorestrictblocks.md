---
myst:
  html_meta:
    "description": "How to Restrict blocks per content type or path"
    "property=og:description": "How to Restrict blocks per content type or path"
    "property=og:title": "How to Restrict blocks"
    "keywords": "Volto, Plone, frontend, React, blocks"
---

# How to Restrict blocks

You can restrict blocks from being added to a content type using the `restrict` key in the configuration object.
This key can be a boolean or a function.
If the block is restricted, it won't show in the chooser.
However, it can be still added programatically or using directly the RESTAPI, so this restriction only applies to the user interface.
The function has this signature:

```ts
{
  restricted: (args: {
    properties: Content;
    block: BlockConfigBase;
    navRoot: Content;
    contentType: string;
  }) => boolean;
}
```

Where `properties` is the current object data and `block` is the block being evaluated in `BlockChooser`.
`navRoot` is the nearest navigation root object and `contentType` is the current content type.

You can restrict a block from showing only in `News Items` and for all content types from a specific location in the content tree by configuring:

```ts
const testBlockConditional = {
  ...testBlock,
  id: 'testBlockConditional',
  title: 'Test Conditional Block',
  restricted: ({ properties, navRoot, contentType }) => {
    if (contentType === 'News Item') {
      return false;
    } else if (flattenToAppURL(properties?.parent?.['@id']) === '/folder') {
      return false;
    }
    return true;
  },
};
```
