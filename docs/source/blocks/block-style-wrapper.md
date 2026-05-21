---
myst:
  html_meta:
    "description": "The block style wrapper is part of a block anatomy. It allows you to inject styles from the block schema into the block wrapper in the form of class names."
    "property=og:description": "The block style wrapper is part of a block anatomy. It allows you to inject styles from the block schema into the block wrapper in the form of class names."
    "property=og:title": "Blocks - Style Wrapper"
    "keywords": "Volto, Plone, frontend, React, Blocks, Edit, Style, Wrapper, components, CSS variables"
---

(block-style-wrapper-label)=

# Block style wrapper

```{versionadded} 16.0.0
```

The block style wrapper is part of a block’s anatomy.
It wraps both the edit and view components, and applies styles declared in the block schema in two ways:

- {ref}`block-style-wrapper-custom-css-properties-label`
- {ref}`block-style-wrapper-generated-class-names-label`

The wrapper is always present.
Enable styling by adding a `styles` object field to your block schema.
The wrapper reads values from the `styles` object and injects them into the edit and view components.

```{tip}
Prefer custom CSS properties.
They are flexible, cascade-friendly, and pragmatic for theming and per-block overrides.
Use generated class names for discrete, pre-defined variants.
```

## Quick start

Add a `styles` object to your block schema.
Instead of doing it manually every time, use the `addStyling` helper:

```js
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';

export const MyBlockSchema = ({ intl }) => {
  const schema = { /* your block schema */ };

  // Adds an empty `styles` object field under a "Styling" fieldset
  addStyling({ schema, intl });

  // Add your styling controls
  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: 'Alignment',
    actions: ['left', 'center', 'right'],
  };
  schema.properties.styles.schema.fieldsets[0].fields.push('align');

  return schema;
};
```

You can compose reusable styling controls using `composeSchema`:

```js
import { composeSchema } from '@plone/volto/helpers';

config.blocks.blocksConfig.listing.schemaEnhancer = composeSchema(
  config.blocks.blocksConfig.listing.schemaEnhancer,
  addStyling,
  addMyCustomColorStylingField,
```

```{note}
The `styles` field is not added automatically.
Use `addStyling`, or add it manually as an `object` widget.
Values defined in `styles` are injected by the wrapper in edit and view components.
```

(block-style-wrapper-custom-css-properties-label)=
## Custom CSS properties (recommended)

```{versionadded} 17.8.0
```

Use CSS custom properties for flexible, themeable styling that benefits from the cascade.
Define CSS to consume a variable with `var(--your-prop)` and add the corresponding property name as a key in the `styles` object.

Example: control an image aspect ratio per block.

```js
// In the block schema enhancer
schema.properties.styles.schema.fieldsets[0].fields = [
  ...schema.properties.styles.schema.fieldsets[0].fields,
  '--image-aspect-ratio',
];

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

Theme CSS:

```css
.block.teaser img {
  aspect-ratio: var(--image-aspect-ratio, 16 / 9);
}
```

Resulting markup (with default selected):

```html
<div class="block teaser" style="--image-aspect-ratio: 1">
  <img src="example.png" />
  ...
</div>
```

Use injected properties in a custom block view component:

```jsx
const BlockView = (props) => (
  <div style={props.style}>
    {/* Block's view component code */}
  </div>
);
```

```{seealso}
[CSS custom properties basics](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
```

### Nested custom CSS properties

You can inject nested variables.
The wrapper prefixes nested keys with the parent key using `--parent--child` naming.
This is useful for grouping related properties, or if the thing that you're styling requires multiple properties.

(inject-nested-custom-css-properties)=

#### Inject nested custom CSS properties

Given this enhancer:

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

It will generate values for the block style wrapper to use:

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

Resulting inline variables will have the injected `--theme--` prefix:

```html
<div class="block teaser" style="--theme--background-color: #222; --theme--font-color: white">
  ...
</div>
```

````{note}
The `color_picker` widget, when given a list of `StyleDefinition` objects, will save the selected color as a nested object of CSS custom properties.
This is a common pattern for theming controls.

```ts
import { StyleDefinition } from '@plone/types';

const colors: StyleDefinition[] = [
  {
    name: 'dark',
    label: 'Dark',
    style: {
      '--background-color': '#222',
      '--font-color': 'white',
    },
  },
  {
    name: 'light',
    label: 'Light',
    style: {
      '--background-color': 'white',
      '--font-color': '#222',
    },
  },
];
```
````

#### Avoid injecting nested prefixes

When you need exact variable names without a parent prefix, append the `:noprefix` suffix to the field name in your enhancer.

```js
schema.properties.styles.schema.fieldsets[0].fields = [
  ...schema.properties.styles.schema.fieldsets[0].fields,
  'theme:noprefix',
];

schema.properties.styles.schema.properties['theme:noprefix'] = {
  widget: 'color_picker',
  title: 'Theme',
  colors,
  default: defaultBGColor,
};
```

This yields inline variables without the prefix:

```html
<div class="block teaser" style="--background-color: #222; --font-color: white">
  ...
</div>
```

(block-style-wrapper-generated-class-names-label)=
## Generated class names

The wrapper can generate class names from the `styles` object.
This is useful when mapping discrete, curated style tokens to theme classes.

Class names are built by concatenating key–value pairs with `--` and prefixing with `has--`.
One level of nesting is supported.

Given:

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

Resulting classes:

```html
<div class="has--backgroundColor--ee22ee has--myCustomStyleField--red has--myCustom2StyleField--color--black has--myCustom2StyleField--gradient--MyGradient">
```

Pass the injected `className` to the root element in your view component:

```jsx
const BlockView = (props) => (
  <div className={props.className}>
    {/* Block's view component code */}
  </div>
);
```

### Customize generated class names

You can customize class generation with converters in `config.settings.styleClassNameConverters` by suffixing field names with the converter name.
For example:

```
{
  "styles": {
    "theme:noprefix": "primary",
    "inverted:bool": true
  }
}
```

Generates:

```css
primary inverted
```

## Error class for blocks

When a user submits data and the block has a validation error (for example, via `blocksErrors`), the wrapper automatically adds the `error` class.
This allows you to customize the appearance of errors via CSS:

```css
.block.error {
  border: 1px solid red;
  background: #fff0f0;
}
```

The class is added automatically by the block engine.

## Align class injection

While injecting style wrapper classes, the engine also injects `data.align` as a class for layout backwards compatibility.
Each block editor wrapper has `block-editor-<block_id> <block_align>`, for example:

```html
<div data-rbd-draggable-context-id="0" data-rbd-draggable-id="9949a5fa-5d57-4e0c-a150-71149a31096c" class="block-editor-listing center">
  ...
</div>
```

Use this to help position blocks within legacy layouts if needed.

## Style object builder enhancer

The style wrapper exposes a helper that can programmatically build or modify a style object (inline variables) from block data.
Register a utility of type `styleWrapperStyleObjectEnhancer`:

```ts
config.registerUtility({
  name: 'blockThemesEnhancer',
  type: 'styleWrapperStyleObjectEnhancer',
  method: blockThemesEnhancer,
});
```

The registered utility has the following signature.

```ts
type blockThemesEnhancerType = ({
  data,
  container,
}: {
  data: BlocksFormData;
  container: BlocksFormData;
}) => Record<`--${string}`, string>;
```

`data` is the current block, and `container` is its parent block, when applicable.
The utility returns a record of CSS custom properties to inject.

## Best practices

- Prefer custom CSS properties for most styling needs.
  They compose well and avoid class name bloat.
- Reserve generated classes for semantic variants that map to predefined theme classes.
- Keep `styles` values human-friendly in the UI, but map to robust tokens in CSS.
- Avoid mixing both mechanisms for the same concern.
  Pick variables or classes per concern.
- Always pass `className` or `style` to your block's root element in the view component.

