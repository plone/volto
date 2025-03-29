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

```{versionadded} 16.0.0
```

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
The style wrapper will read the styles and inject the resultant class names into the edit and view components as shown in the next sections.

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
Thus you can use it in the root component of your block view component as follows:

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

## Customize the injected class names

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

## Inject custom CSS properties

```{versionadded} 17.8.0
```

The style wrapper also allows to inject custom CSS properties.
This is useful where the property that you want to inject is customizable per project.
For example, imagine you have an existing global CSS custom property `--image-aspect-ratio` that you use for all images in all blocks.
Then in your customized theme, you could set CSS attributes for this property, changing it in runtime.
The key feature of custom CSS properties is that they can be applied also using the cascade.
This means that they can be placed anywhere in either CSS definitions or HTML structure, and they will be applied only in the context where they are defined.

As an example, first define the style of a teaser block image as follows.

```css
.block.teaser img {
  aspect-ratio: var(--image-aspect-ratio, 16 / 9);
}
```

Next, you can enhance a block's schema by injecting the custom CSS property as follows.

```js
  schema.properties.styles.schema.fieldsets[0].fields = [
    ...schema.properties.styles.schema.fieldsets[0].fields,
    '--image-aspect-ratio',
  ];

  // We use a select widget and set a default
  schema.properties.styles.schema.properties['--image-aspect-ratio'] = {
    widget: 'select',
    title: 'Aspect Ratio',
    choices: [
      ['1', '1:1'],
      ['16 / 9', '16/9'],
    ],
    default: '1',
  };
```

Finally, assuming that you select the default value for the {guilabel}`Aspect Ratio` for the custom CSS property, then the markup of the block will contain the custom property as shown.

```html
<div class="block teaser" style="--image-aspect-ratio: 1">
<img src="example.png">
</div>
```

As you can see, the custom CSS declaration applies only in the `div` where you inject the property.

```{seealso}
[CSS custom properties basics](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)
```

If you want to use it in your custom components, you need to apply it in the root of your block's view component as follows:

```jsx
const BlockView = (props)=> (
  <div style={props.style}>
    // Block's view component code
  </div>
)
```

```{note}
You need to manually add the above code in your view component block code to benefit from the style injection.
The styles in the block edit component are injected automatically into the blocks engine editor wrappers, so you don't have to take any action.
```

## Nested custom CSS properties

This section describes how to work with nested custom CSS properties.
You can inject custom CSS properties in a nested manner.
You can also avoid some nesting, where useful.


(inject-nested-custom-css-properties)=

### Inject nested custom CSS properties

Given this block enhancer:

```js
  schema.properties.styles.schema.fieldsets[0].fields = [
    ...schema.properties.styles.schema.fieldsets[0].fields,
    'theme',
  ];

  schema.properties.styles.schema.properties['theme'] = {
    widget: 'color_picker',
    title: 'Theme',
    colors,
    default: defaultBGColor,
  };
```

It will generate these values for the `StyleWrapper` to use:

```js
{
  "styles": {
    "theme": {
      "--background-color": "#222",
      "--font-color": "white"
    }
  }
}
```

The resultant injected custom CSS properties will be prefixed with two dashes plus the name of the key, `--theme` in this example.

```html
<div class="block teaser" style="--theme--background-color: #222, --theme--font-color: white">
 ...
</div>
```


### Avoid injecting nested custom CSS properties

Sometimes you might not want to build the custom CSS property name with a prefix in a nested structure, as described in {ref}`inject-nested-custom-css-properties`, because you want to use the exact names defined in your custom CSS properties.
To avoid building a prefix, you can append the suffix `:noprefix` in your block enhancer.

```js
  schema.properties.styles.schema.fieldsets[0].fields = [
    ...schema.properties.styles.schema.fieldsets[0].fields,
    'theme:noprefix',
  ];

  schema.properties.styles.schema.properties['theme:noprefix'] = {
    widget: 'color_picker',
    title: "Theme",
    colors,
    default: defaultBGColor,
  };
```

It will generate these values for the `StyleWrapper` to use:

```js
{
  "styles": {
    "theme:noprefix": {
      "--background-color": "#222",
      "--font-color": "white"
    }
  }
}
```

This will yield the resultant markup without a prefix.

```html
<div class="block teaser" style="--background-color: #222, --font-color: white">
 ...
</div>
```

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
