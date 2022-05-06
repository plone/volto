---
html_meta:
  "description": "The block style wrapper is part of a block anatomy. It allows you to inject styles from the block schema into the block wrapper in the form of class names."
  "property=og:description": "The block style wrapper is part of a block anatomy. It allows you to inject styles from the block schema into the block wrapper in the form of class names."
  "property=og:title": "Blocks - Style Wrapper"
  "keywords": "Volto, Plone, frontend, React, Blocks, Edit, Style, Wrapper, components"
---

# Blocks - Style Wrapper

The block style wrapper is part of a block anatomy.
It allows you to inject styles from the block schema into the block wrapper in the form of class names.
It wraps the block edit and the view components.

It can be used by directly mapping unique values to CSS properties.
For example, `background-color` could be mapped to a single color.
Although that is a simple use case, the real intent of style wrappers is to allow the definition of complex CSS through a full set of styles mapped to a CSS class.
For example, often applying a background color is not enough, and you need to also modify the font color to make it readable because of contrast issues.
The style object field can be extended to hold any number of fields, depending on your needs.
The resultant set of class names to be injected are built by concatenating the key-value pairs of the `style` object field, separated by `--` and prefixing the result with the `has--` prefix.
The class name generator algorithm supports up to one level of nested objects, constructing the concatenated CSS class from the nested structure as well.
See below for an example.

## Enabling Style Wrapper in a block

The wrapper is always present in the rendering of both the view and edit components.
If you want to add the default set of styles, you need to enable them with the following flag:

```js
  // (in your block config object)
  my_custom_block: {
    // (more block settings)
    stylesEnabled: true,
  }
```

```{note}
This will work if your block uses the `BlocksForm` component to define schema-driven block configuration settings.
```

This will add a new fieldset `Styling` to your block schema settings.
By default, only a `backgroundColor` property is set, configured by `defaultSchema` in `src/components/manage/Blocks/Block/StylesSchema.jsx`.

## Extending the default styling field

You can modify the default set of styles by using a `schemaEnhancer` function in the same way that you would for any block schema enhancer.
Use the `stylesSchema` key in your block configuration object as follows:

```js
import { styleSchemaEnhancer } from '@plone/volto/components/manage/Blocks/Block/StylesSchema';

  // (in your block config object)
  my_custom_block: {
    // (more block settings)
    stylesEnabled: true,
    stylesSchema: myCustomStyleSchema
  }
```

```{note}
The signature for a `schemaEnhancer` is `({schema, formData, intl})`.
```

## The `styles` field

The `styles` field is mapped to an `objectWidget`.
The `stylesSchema` adds the fields into this field, creating an object that is the sum of all of the widgets assigned to it and its values.

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
}
```

## Using `className` in your block

The resultant class names are injected as a `className` prop into the wrapped block.
Thus you can use it in the root component of your block view and edit components as follows:

```jsx
const BlockView = (props)=> (
  <div className={props.className}>
    // Block's code
  </div>
)
```

Same for the block edit component.
The resultant HTML would be the following:

```html
<div className="has--backgroundColor--ee22ee has--myCustomStyleField--red has--myCustom2StyleField--color--black has--myCustom2StyleField--color--MyGradient">
```

Then it's at your discretion how you define the CSS class names in your theme.
