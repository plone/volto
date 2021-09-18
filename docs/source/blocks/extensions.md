# Block extensions mechanism

A common pattern in blocks is "variations" - slightly different versions of
a block that can be toggled on demand by the editors. Choosing the
listing template (gallery, summary listing, etc) for the Listing block is
one example of the typical use cases for this feature.

A block can define variations in the block configuration. These variations can
be used to enhance or complement the default behavior of a block without having
to shadow its stock components. These enhancements can be at a settings level
(add or remove block settings) via schema enhancers or, if the code of your
block allows it, even use alternative renderers (eg. in view mode) showing the
enhanced fields or modifying the block look and feel or behavior.

!!! note
    The Listing block already supports several of them (only in the "template" or
    the component to show on view mode), and can be extended, although it still
    do not use the final specification on how to define them in the
    configuration, (that will change in next Volto versions). The rest of the
    stock Volto blocks will also follow to support variations by default.

While it is up to each specific block implementations on how they actually use
this machinery, Volto provides the infrastructure to help define block
extensions and variations.

## Block variations

Volto ships with a default extension mechanism for blocks, named "variation".
It is advisable to use this extension point for the typical use case of
"alternative view template for the block".

A block can define variations in the block configuration. These variations can
be used to enhance or complement the default behavior of a block without having
to shadow its stock components. These enhancements can be at a settings level
(add or remove block settings) via schema enhancers or, if the code of your
block allows it, even use alternative renderers (eg. in view mode) showing the
enhanced fields or modifying the block look and feel or behavior.

If you use schema-based forms to edit the block's data, use the `BlockDataForm`
component instead of the `InlineForm`. The BlockDataForm component will automatically
inject a "variation" select dropdown into the form (if any defined), allowing editors
to choose the desired block variation.

This is how the configuration would like for an imaginary block:

```jsx
export default (config) => {
  config.blocks.blocksConfig.teaserBlock.variations = [
    {
      id: 'default',
      title: 'Default',
      isDefault: true,
      render: SimpleTeaserView
    },
    {
      id: 'card',
      label: 'Card',
      render: CardTeaserView,
      schemaEnhancer: ({schema, formData, intl}) => {
        schema.properties.cardSize = '...'; // fill in your implementation
        return schema;
      }
    }
  ];
}
```

Notice the `schemaEnhancer` field, which allows customization of the schema for
schema-based blocks, when a particular variation is chosen.

To get the same behavior for any other custom extension, you can wrap
InlineForm in the `withBlockSchemaEnhancer` HOC:

```jsx
import { defineMessages } from 'react-intl';

const GalleryBlockForm = withBlockSchemaEnhancer(InlineForm, 'galleryTemplates');
```

You can even wrap BlockDataForm with it and "stack" multiple block extensions
selection dropdowns.

## Schema enhancers

In addition to the select dropdown, the `withBlockSchemaEnhancer` also provides
a schema enhancement mechanism. Any registered extension plugin can provide
a `schemaEnhancer` function that can tweak the schema to be used by the
`InlinForm` component. This function receives an object with `formData`, which
is the block data, `schema` - the original schema that we want to tweak and the
injected `intl`, to aid with internationalization.

For example:

```jsx

const messages = defineMessages({
  title: {
    id: 'Column renderer',
    defaultMessage: 'Column renderer',
  },
});

export default (config) => {
  config.blocks.blocksConfig.dataTable.extensions = {
    ...config.blocks.blocksConfig.dataTable.extensions,
    columnRenderers: {
      title: messages.title,
      items: [
        {
          id: 'default',
          title: 'Default',
          isDefault: true,
          render: DefaultColumnRenderer
        },
        {
          id: 'number',
          title: 'Number',
          render: NumberColumnRenderer,
        },
        {
          id: 'colored',
          title: 'Colored',
          renderer: ColoredColumnRenderer,
          schemaEnhancer: ({formData, schema, intl}) => {
            schema.properties.color = {
              widget: 'color',
              title: 'Color',
            };
            schema.fieldsets[0].fields.push('color');
            return schema;
          }
        }
      ]
    }
  }
}
```

!!! note
    The schemaEnhancer is a generic extension mechanism provided by
    `withBlockSchemaEnhancer`. The `BlockDataForm` component already integrates
    it for the `variation` extension.

## Consuming the extensions

It is completely up to the block implementation on what exactly is an
"extension". The typical use case is to make parts of view renderer
"replaceable". If used with the withBlockSchemaEnhancer-derived forms, the
chosen extension is saved in the block data, but in the rendering we'll
actually need the "resolved" extension object from the blocksConfig
configuration. To help with this We have another HOC, the
`withBlockExtensions`, which injects the resolved extensions object as props.
To use it, wrap your relevant components, for example the block View component.

```
const TableBlockView = (props) => {
  const variation = props.variation;
  const Renderer = variation.view;

  return <Renderer {...props} />;
};

export default withBlockExtensions(TableBlockView);
```
