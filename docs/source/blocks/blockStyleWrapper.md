---
html_meta:
  "description": "The block style wrapper part of a block anatomy, allows you to inject styles from the block schema into the block wrapper in form of class names."
  "property=og:description": "The block style wrapper part of a block anatomy, allows you to inject styles from the block schema into the block wrapper in form of class names."
  "property=og:title": "Blocks - Style Wrapper"
  "keywords": "Volto, Plone, frontend, React, Blocks, Edit, Style, Wrapper, components"
---

# Blocks - Style Wrapper

The block style wrapper part of a block anatomy, allows you to inject styles from the block schema into the block wrapper in form of class names. It's wrapping the block edit and the view components.

## Enabling Style Wrapper in a block

The wrapper is always present in the render of the view and the edit components, but if you want to add styles, you have to enhance the schema of your block:

```js
import { styleSchemaEnhancer } from '@plone/volto/components/manage/Blocks/Block/StylesSchema';

  // (in your block config object)
  my_custom_block: {
    // (more block settings)
    schemaEnhancer: styleSchemaEnhancer,
  }
```

This will add a new fieldset `Styling` to your block schema settings.
By default, only a `backgroundColor` property is set, configured by: `defaultSchema` in `src/components/manage/Blocks/Block/StylesSchema.jsx`.
The schema can be overriden, using the `stylesSchema` key in your block config object, like:

```js
import { styleSchemaEnhancer } from '@plone/volto/components/manage/Blocks/Block/StylesSchema';

  // (in your block config object)
  my_custom_block: {
    // (more block settings)
    schemaEnhancer: styleSchemaEnhancer,
    stylesSchema: myCustomStyleSchema
  }
```

The `style` field is mapped to an `objectWidget`, and the `stylesSchema` adds the fields into this field, creating an object that is the sum of all of the widgets assigned to it, and its values.

```json
{
  "styles": {
    "backgroundColor": "#ee22ee",
    "myCustomStyleField": "red",
    "myCustom2StyleField": {
      "color": "black",
      "gradient": "MyGradient"
  }
}
```

The resultant class names injected into the Style Wrapper are built from this `style` field and its values, like:

```
<div className="has--backgroundColor--ee22ee has--myCustomStyleField--red has--myCustom2StyleField--color--black has--myCustom2StyleField--color--MyGradient">
```

Then, it's at your discretion how you define this CSS class names in your theme.
