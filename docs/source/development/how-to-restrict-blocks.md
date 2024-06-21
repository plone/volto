---
myst:
  html_meta:
    "description": "How to Restrict blocks per content type or path"
    "property=og:description": "How to Restrict blocks per content type or path"
    "property=og:title": "How to Restrict blocks"
    "keywords": "Volto, Plone, frontend, React, blocks, restrict"
---

# How to restrict blocks

You can restrict blocks from being added to a content type using the `restricted` key in the configuration object.
This key can be a boolean or a function that returns a boolean.
If the block is restricted, it won't show in the chooser.
However, it can still be added either programmatically or by directly using the REST API, so this restriction only applies to the user interface.
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

In the following configuration example, you can restrict a block so that it cannot be added unless the content type is `News Item` or the content item is in a specific path in the content tree (`/folder`):

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
