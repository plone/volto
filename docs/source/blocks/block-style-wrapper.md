---
myst:
  html_meta:
    "description": "The block style wrapper is part of a block anatomy. It allows you to inject styles from the block schema into the block wrapper in the form of class names."
    "property=og:description": "The block style wrapper is part of a block anatomy. It allows you to inject styles from the block schema into the block wrapper in the form of class names."
    "property=og:title": "Blocks - Style Wrapper"
    "keywords": "Volto, Plone, frontend, React, Blocks, Edit, Style, Wrapper, components"
---

(block-style-wrapper-label)=

# Block style wrapper

The block style wrapper is part of a block anatomy.
It allows you to inject styles from the block schema into the block wrapper in the form of class names.
It wraps the block edit and the view components.

It can be used by directly mapping unique values to CSS properties.
For example, `background-color` could be mapped to a single color.
Although that is a simple use case, the real intent of style wrappers is to allow the definition of complex CSS through a full set of styles mapped to a CSS class.
For example, often applying a background color is not enough, and you need to also modify the font color to make it readable because of contrast issues.
The style object field can be extended to hold any number of fields, depending on your needs.
The resultant set of class names to be injected are built by concatenating the key-value pairs of the `styles` object field, separated by `--` and prefixing the result with the `has--` prefix.
The class name generator algorithm supports up to one level of nested objects, constructing the concatenated CSS class from the nested structure as well.
See below for an example.

## Enabling Style Wrapper in a block

The wrapper is always present in the rendering of both the view and edit components.
Once you add the `styles` field in your block schema, the wrapper will inject the class names derived from it into both the view and the edit components.

### Using `styles` field in your block

The wrapper builds the class names to be injected by looking up a field called `styles` in your block schema.
As a schema it has the following signature, and it's normally placed in a `Styling` fieldset:

```js
const EMPTY_STYLES_SCHEMA = {
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [],
    },
  ],
  properties: {},
  required: [],
};

const stylingSchema = {
  fieldsets: [{
    id: 'styling',
    title: intl.formatMessage(messages.styling),
    fields: ['styles'],
  }],

  properties: {
    styles: {
      widget: 'object',
      title: intl.formatMessage(messages.styling),
      schema: EMPTY_STYLES_SCHEMA
    }
  }
}
```

The `addStyling` schemaEnhancer adds the (empty) `styles` field inside the `Styling` fieldset for you, so when defining your block schema you can do:

```js
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

export const TeaserSchema = ({ intl }) => {
  const schema = {
  // Here your block schema
  };

  addStyling({ schema, intl });

  // Here you add your custom styling properties to the `styles` object
  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: intl.formatMessage(messages.align),
    actions: ['left', 'right', 'center'],
  };

  // and finally add it to the default fieldset
  schema.properties.styles.schema.fieldsets[0].fields.push('align');

  return schema;
};
```

You can add a set of style fields defining your block styles—such as alignment, background color, and so on—in your block schema by adding them to the `styles` object field as shown above.

In case you decide to create reusable sets of styling controls for your blocks, you can use the `composeSchema` helper to compose multiple schemaEnhancers:

```js
import { composeSchema } from '@plone/volto/helpers';

// ...
config.blocks.blocksConfig.listing.schemaEnhancer = composeSchema(
  config.blocks.blocksConfig.listing.schemaEnhancer,
  addStyling,
  addMyCustomColorStylingField,
)
```

## The `styles` field

The `styles` field is mapped to an `objectWidget`.
The following is an example of a possible set of styles.
The style wrapper will read the styles and inject them into the edit and view components as shown in the next sections.

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

## Using the injected class names in your block

The resultant class names are injected as a `className` prop into the wrapped block.
Thus you can use it in the root component of your block view and edit components as follows:

```jsx
const BlockView = (props)=> (
  <div className={props.className}>
    // Block's view component code
  </div>
)
```

```{note}
You need to manually add the above code in your view component block code in order to benefit from the class names injection.
The styles in the block edit component are injected automatically into the blocks engine editor wrappers, so you don't have to take any action.
```

The resultant HTML would be the following:

```html
<div class="has--backgroundColor--ee22ee has--myCustomStyleField--red has--myCustom2StyleField--color--black has--myCustom2StyleField--color--MyGradient">
```
Then it's at your discretion how you define the CSS class names in your theme.

If you need other style of classnames generated, you can use the classname
converters defined in `config.settings.styleClassNameConverters`, by
registering fieldnames suffixed with the converter name. For example, a style
data like:

```
{
  "styles": {
    "theme:noprefix": "primary",
    "inverted:bool": true,
  }
}
```

will generate classnames `primary inverted`

## Align class injection

There is an automatic class name injection happening at the same time the style wrapper class names injection.
The `data.align` is also injected directly.
This is in place to help properly position the block in the current layout and play well with legacy CSS and block layout.
This might be replaced in the future by the style wrapper class names injection.

Each block in the Block Engine has a main wrapper with an automatic class name `block-editor-<block_id> <block_align>`, as shown in the following example:

```html
<div data-rbd-draggable-context-id="0" data-rbd-draggable-id="9949a5fa-5d57-4e0c-a150-71149a31096c" class="block-editor-listing center">
  ...
</div>
```

You can use it for further control over the positioning and layout of the block.
