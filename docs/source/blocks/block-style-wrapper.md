---
html_meta:
  "description": "The block style wrapper part of a block anatomy, allows you to inject styles from the block schema into the block wrapper in form of class names."
  "property=og:description": "The block style wrapper part of a block anatomy, allows you to inject styles from the block schema into the block wrapper in form of class names."
  "property=og:title": "Blocks - Style Wrapper"
  "keywords": "Volto, Plone, frontend, React, Blocks, Edit, Style, Wrapper, components"
---

# Blocks - Style Wrapper

The block style wrapper is part of a block anatomy.
It allows you to inject styles from the block schema into the block wrapper in the form of class names.
It wraps the block edit and the view components.

It can be used mapping directly unique values to CSS properties, like `background-color` mapped to a single color.
However, the real intention is to bring the ability to create a way to define complex CSS and a full set of styles mapped to a CSS class.
For example, very often, applying a background color is not enough, and you need to modify also the font color as well, in order to make it readable because of contrast issues.
The style object field can be extended to hold any number of fields, depending on your needs.
The resultant set of class names to be injected are built concatenating the key-value pairs of the `style` object field, separated by `--` and prefixing the result with the `has--` prefix.
The class name generator algorithm supports up to one level of nested objects, constructing the concatenated CSS class from the nested structure as well.
See below for an example.

## Enabling Style Wrapper in a block

The wrapper is always present in the render of the view and the edit components.
If you want to add the default set of styles, you need to enable with the following flag:

```js
  // (in your block config object)
  my_custom_block: {
    // (more block settings)
    stylesEnabled: true,
  }
```

```{note}
This will work if your block uses `BlocksForm` component to define an schema driven block configuration settings.
```

This will add a new fieldset `Styling` to your block schema settings.
By default, only a `backgroundColor` property is set, configured by: `defaultSchema` in `src/components/manage/Blocks/Block/StylesSchema.jsx`.

## Extending the default styling field

You can modify the default set of styles, by using a `schemaEnhancer` function, in the same way that you would do it for any block schema enhancer.
Use the `stylesSchema` key in your block config object as follows:

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
}
```

## Using the classNames in your block

The resultant class names injected as a `className` prop into the wrapped Block. So you can use it in the root component of your block view and edit components, as follows:

```jsx
const BlockView = (props)=> (
  <div className={props.className}>
    // Block's code
  </div>
)
```

Same for the block edit component.
The resultant HTML would be like:

```html
<div className="has--backgroundColor--ee22ee has--myCustomStyleField--red has--myCustom2StyleField--color--black has--myCustom2StyleField--color--MyGradient">
```

Then it's at your discretion how you define the CSS class names in your theme.
