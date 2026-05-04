---
myst:
  html_meta:
    "description": "Configure schema-driven style fields in Seven"
    "property=og:description": "Configure schema-driven style fields in Seven"
    "property=og:title": "Configure style fields"
    "keywords": "Seven, style fields, theme, blocks, Plate"
---

# Configure style fields

This guide explains how to configure schema-driven style fields in Seven.
It focuses on a `theme` field, because that is the common case for the new style field system.

Use this model when you want a block to store a semantic ID, such as `default` or `sand`, and resolve that ID to a runtime style object later.

## How it works

The style field system has three parts:

1. The block schema marks a field as a style-backed field.
2. A registry utility returns the `StyleDefinition[]` for that field.
3. Runtime resolves the stored ID to a `style` object, and injects it into the rendered block.

The important consequence is that the block stores a semantic ID, not raw CSS.

For example, a block can store `sand` as an identifier:

```ts
{
  '@type': 'teaser',
  theme: 'sand',
}
```

And Seven can later resolve `sand` to a CSS variable:

```ts
{
  '--theme-color': 'wheat',
}
```

## Mark the schema field

Configure generic style fields in the block schema.
Add the field as usual, then mark it with `styleField: true`.

```ts
export function TeaserSchema(): JSONSchema {
  return {
    title: 'Teaser',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['theme'],
      },
    ],
    properties: {
      theme: {
        title: 'Theme',
        widget: 'choices',
        default: 'default',
        choices: [
          ['default', 'Default'],
          ['sand', 'Sand'],
          ['night', 'Night'],
        ],
        styleField: true,
      },
    },
    required: [],
  };
}
```

The schema is now the source of truth for:

- the field name
- the widget
- the default value
- the available values exposed by the widget

Seven reads this metadata from the schema at runtime.

## Register the style definitions

Next, register a `styleFieldDefinition` utility for the field name.
The following code example shows how to register a `theme` field.

```ts
config.registerUtility({
  type: 'styleFieldDefinition',
  name: 'theme',
  method: ({ blockType }) => {
    const blockConfig = blockType
      ? config.blocks.blocksConfig?.[blockType]
      : undefined;

    return blockConfig?.themes ?? config.blocks.themes ?? [];
  },
});
```

This utility must return an array of `StyleDefinition` items:

```ts
config.blocks.themes = [
  {
    name: 'default',
    label: 'Default',
    style: {
      '--theme-color': 'white',
    },
  },
  {
    name: 'sand',
    label: 'Sand',
    style: {
      '--theme-color': 'wheat',
    },
  },
  {
    name: 'night',
    label: 'Night',
    style: {
      '--theme-color': '#111',
    },
  },
];
```

Each item has:

`name`
:   the literal stored in the block data

`label`
:   the human-readable label

`style`
:   the inline style object injected at runtime

## Use the field in block data

Once the schema field and utility are registered, the block only stores the selected ID:

```ts
{
  '@type': 'teaser',
  theme: 'night',
}
```

At render time, Seven:

1. inspects the schema
2. finds fields marked with `styleField`
3. looks up a `styleFieldDefinition` utility with the same field name
4. resolves the stored value against the returned `StyleDefinition[]`
5. injects the matching `style` object into the block wrapper

This works in both:

- Plate and Somersault rendering
- public block rendering in `@plone/layout`

## Nested storage

If the value must be stored under a nested key, use an object marker instead of `true`.

```ts
theme: {
  title: 'Theme',
  widget: 'choices',
  default: 'default',
  choices: [
    ['default', 'Default'],
    ['sand', 'Sand'],
  ],
  styleField: {
    path: 'styles.theme',
  },
}
```

This stores the selected value under:

```ts
{
  styles: {
    theme: 'sand',
  },
}
```

Use this only when you need compatibility with an existing data shape.
For new Seven code, flat fields such as `theme` are the preferred default.

## Why `blockWidth` is different

`blockWidth` remains special.
It is intrinsic to the block wrapper and width policy of each block, so it still uses `blockWidth` configuration in `blocksConfig` and `plateBlocksConfig`.

That means:

- generic style fields such as `theme` are schema-driven
- `blockWidth` remains block configuration-driven

The global width definitions themselves have not changed.
They are still defined in `config.blocks.widths` and resolved through the `blockWidth` utility.

## Theme example

Take the foregoing parts and put them together to form a complete theme example.

```ts
config.blocks.themes = [
  {
    name: 'default',
    label: 'Default',
    style: {
      '--theme-color': 'white',
    },
  },
  {
    name: 'sand',
    label: 'Sand',
    style: {
      '--theme-color': 'wheat',
    },
  },
];

config.registerUtility({
  type: 'styleFieldDefinition',
  name: 'theme',
  method: () => config.blocks.themes,
});
```

This is the simplest useful version.
The utility just returns the shared theme definitions from `config.blocks.themes`.

You could make the `method` more elaborate, as shown above, for example:

```ts
config.registerUtility({
  type: 'styleFieldDefinition',
  name: 'theme',
  method: ({ blockType }) => {
    const blockConfig = blockType
      ? config.blocks.blocksConfig?.[blockType]
      : undefined;

    return blockConfig?.themes ?? config.blocks.themes ?? [];
  },
});
```

That version is more flexible, because it allows block-specific theme definitions with a global fallback.
However, it is also more complex.

If you do not need block-specific theme sets, prefer the simpler version that returns `config.blocks.themes` directly.

```ts
export function TeaserSchema(): JSONSchema {
  return {
    title: 'Teaser',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['theme'],
      },
    ],
    properties: {
      theme: {
        title: 'Theme',
        widget: 'choices',
        default: 'default',
        choices: [
          ['default', 'Default'],
          ['sand', 'Sand'],
        ],
        styleField: true,
      },
    },
    required: [],
  };
}
```

```ts
{
  '@type': 'teaser',
  theme: 'sand',
}
```

That `sand` value is resolved at runtime to:

```ts
{
  '--theme-color': 'wheat',
}
```

## Summary

For generic style-backed fields:

- define the field in the schema
- mark it with `styleField`
- set its `default` in the schema
- expose its values through `choices` or `actions` (or other widget configuration)
- register a `styleFieldDefinition` utility with the same field name

For `blockWidth`, keep using the existing `blockWidth` block configuration.
