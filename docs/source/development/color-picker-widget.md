---
myst:
  html_meta:
    "description": "How to use the color picker widget in blocks settings and forms"
    "property=og:description": "How to use the color picker widget in blocks settings and forms"
    "property=og:title": "How to use the color picker widget"
    "keywords": "Volto, Plone, frontend, React, blocks, forms, widget, color, picker"
---

# Color picker widget

Volto comes with a color picker widget that can be used in any Volto form.
It allows to pick a color from a preset list of colors.
This preset list of colors is passed using the `colors` prop.
You can [try a demo of the default color picker](https://6.docs.plone.org/storybook/?path=/story/edit-widgets-colorpicker--default).
You can combine the color picker widget with the {doc}`../blocks/block-style-wrapper` to have a powerful, yet simple way to manage color properties in your blocks.
You can use it either in your custom block's styles schema or enhance an existing block as follows:

```{code-block} js
:emphasize-lines: 13-16, 31-42
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  backgroundColor: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
});

export const defaultStylingSchema = ({ schema, formData, intl }) => {
  const BG_COLORS = [
    { name: 'transparent', label: 'Transparent' },
    { name: 'grey', label: 'Grey' },
  ];

  // You could allow passing the color definition from the config or from the default
  // defined above
  const colors =
    config.blocks?.blocksConfig?.[formData['@type']]?.colors || BG_COLORS;

  // Same for the default used (or undefined)
  const defaultBGColor =
    config.blocks?.blocksConfig?.[formData['@type']]?.defaultBGColor;

  // This adds the StyleWrapper support to your block
  addStyling({ schema, intl });

  // Then we add the field to the fieldset inside the StyleWrapper `styles` field schema fieldset array
  schema.properties.styles.schema.fieldsets[0].fields = [
    ...schema.properties.styles.schema.fieldsets[0].fields,
    'backGroundColor',
  ];

  // and finally, we add the field to the StyleWrapper `styles` object field schema properties
  schema.properties.styles.schema.properties['backGroundColor'] = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    colors,
    default: defaultBGColor,
  };

  return schema;
};
```

The color picker widget's discriminator is `color_picker`.

## Color definitions

```{versionchanged} 17.9.0
Enhanced `ColorPickerWidget` with additional color definitions, saving it as an object instead of a string.
```

The `colors` property of the widget controls which colors are available to choose in the widget.
This is the signature of the object along with an example:

```ts
type Color =
  | {
      name: string;
      label: string;
      style: Record<`--${string}`, string>;
    }
  | {
      name: string;
      label: string;
      style: undefined;
    };

const colors: Color[] = [
  {
    name: 'red',
    label: 'red',
    style: { '--background-color': 'red' } },
  {
    name: 'yellow',
    label: 'yellow',
    style: { '--background-color': 'yellow' },
  },
  {
    name: 'green',
    label: 'green'
  },
]
```

### Basic color definition

The basic color definition is the one that saves a string as the widget value.
This string is the one defined by the `name` key.
You can use it on your own code by reading it from the resultant data and use it according your designed solution.

When combined with the `StyleWrapper`, the value will be injected as a class name of the form `has--PROPERTY_NAME--PROPERTY_VALUE`:

```html
<div class="has--backgroundColor--green">
  ...
</div>
```

Then you should create the CSS rules according to these injected class names.

### Custom CSS properties as color definitions

The `style` key defines a set of custom CSS properties to be added as the value to the HTML attribute `style`.
They will be injected by the `StyleWrapper` as style definitions, so you can use them in your CSS rules.

```html
<div class="block teaser" style="--background-color: red">
...
</div>
```

```css
.block.teaser {
  background-color: var(--background-color, transparent);
}
```

The `name` key is mandatory in order to generate proper markup in the resultant HTML in both forms.

You can also use this selector, where an element with class names `block` and `teaser` with a child element whose HTML attribute `style` contains the value of `--background-color`:

```scss
.block.teaser {
  &[style*='--background-color'] {
    padding: 20px 0;
  }
}
```

```{seealso}
See the MDN CSS Reference for selectors.

- [Attribute selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)
- [`&` nesting selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector)
```


## Use both basic and custom CSS properties definitions

You can combine both basic and custom CSS properties definitions.
It's up to you how to mix and match them.
