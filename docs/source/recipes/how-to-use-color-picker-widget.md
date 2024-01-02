---
myst:
  html_meta:
    "description": "How to use the color picker widget in blocks settings and forms"
    "property=og:description": "How to use the color picker widget in blocks settings and forms"
    "property=og:title": "How to use the color picker widget"
    "keywords": "Volto, Plone, frontend, React, blocks, forms, widget, color, picker"
---

# How to use the color picker widget

Volto comes with a color picker widget that can be used in any Volto form.
The most common use case is use this value along with the blocks StyleWrapper as show in the example. See {ref}`block-style-wrapper-label` for more background about how the blocks StyleWrapper works.
Combined with the blocks StyleWrapper you can have a powerful, yet simple way to manage color properties in your blocks.
It can be used in your custom block settings schema or enhance an existing block as follows:

```js hl_lines="13-16, 31-42"
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

  // This adds the StylingWrapper support to your block
  addStyling({ schema, intl });

  // Then we add the field to the fieldset inside the StylingWrapper `styles` field schema fieldset array
  schema.properties.styles.schema.fieldsets[0].fields = [
    ...schema.properties.styles.schema.fieldsets[0].fields,
    'backGroundColor',
  ];

  // and finally, we add the field to the StylingWrapper `styles` object field schema properties
  schema.properties.styles.schema.properties['backGroundColor'] = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    colors,
    default: defaultBGColor,
  };

  return schema;
};
```

The widget name the color picker widget uses is `color_picker`.

## Color definitions

The `colors` property of the widget controls which colors are available to choose in the widget.
This is the signature of the object:

```ts
type Color =
  | {
      label: string;
      style: Record<`--${string}`, string> & { name: string };
    }
  | {
      name: string;
      label: string;
    };

const colors: Color[] = [
  { style: { name: 'red', '--background-color': 'red' }, label: 'red' },
  {
    style: { name: 'yellow', '--background-color': 'yellow' },
    label: 'yellow',
  },
  { name: 'green', label: 'green' },
]
```

## Using basic definitions

The basic color definition is the one that saves a string label as the widget value.
You can use it on your own code by reading it from the resultant data and use it according your designed solution.

In the case of using it along with the StyleWrapper, the value will be injected as a class name of the form:

```html
<div class="has--backgroundColor--ee22ee">
  ...
</div>
```

Then you should create the CSS rules according to these injected class names.

## Using custom CSS properties as color definitions

The `style` key defines a set of custom CSS properties to be saved as widget value.
They will be injected by the StyleWrapper as style definitions and you will be able to use them in your CSS rules.

```html
<div class="block teaser" style="--background-color': 'red'">
...
</div>
```

```css
.block.teaser {
  background-color: var(--background-color, transparent);
}
```

The `name` key is mandatory in order to generate proper markup in the resultant HTML in both forms.
It is also included by the StyleWrapper as a injected class name, in case you need it too in your CSS selectors.

You can also use this selector in case it comes in handy:

```css
.block.teaser {
  &[style*='--background-color'] {
     padding: 20px 0;
 }
 ```

## Use both basic and custom CSS properties definitions

You can combine both basic and style definitions, it's up to you how to mix and match them.
