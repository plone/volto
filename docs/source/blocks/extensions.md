# Block extensions mechanism

A common pattern in blocks is "variations" - slightly different versions of
a block that can be toggled on demand by the editors. For example, chosing the
listing template (gallery, summary listing, etc) for the Listing block is
an example of the variation pattern.

While it is up to the specific block implementations on how they actually use
this machinery, Volto provides some helpers for the block extensions story, as
explained further on this page.


## Block extensions in config

The configuration registry is the place where addons, projects and Volto itself
meet, extend and override one another. So, to define new extensions for
a block, the natural place to put it is in that block's block configuration.

This is how it would look like for an imaginary block:

```jsx
export default (config) => {
  config.blocks.blocksConfig.dataTable.extensions = {
    ...config.blocks.blocksConfig.dataTable.extensions,
    columnRenderers: [
      {
        id: 'default',
        label: 'Default',
        render: DefaultColumnRenderer
      },
      {
        id: 'number',
        label: 'Number',
        render: NumberColumnRenderer,
      }
    ]
  }
}
```

Notice that we're declaring a new extension mechanism named "columnRenderers"
for our block. Any other addon or project can now add new column renderers just
by mutating our block's config. How that is further used, it's all up to the
block developer.

## Block variations

Volto ships with a default extension mechanism for blocks, named "variation".
It is advisable to use this extension point in case you want to make your block
extendable.

If you use schema-based forms to edit the block's data, use the `BlockDataForm`
component instead of the `InlineForm`. The BlockDataForm component will
automatically inject a "variation" select dropdown into the form, allowing
editors to choose the desired block variation.

To do the same for your custom extension, you can wrap InlineForm in the
`withBlockSchemaEnhancer` HOC:

```jsx
import { defineMessages } from 'react-intl';

const title = defineMessages({
  id: 'galleryTemplate',
  defaultMessage: "Gallery template"
});

const GalleryBlockForm = withBlockSchemaEnhancer(InlineForm, {
  extensionName: 'galleryTemplates',
  title: title
});
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
export default (config) => {
  config.blocks.blocksConfig.dataTable.extensions = {
    ...config.blocks.blocksConfig.dataTable.extensions,
    columnRenderers: [
      {
        id: 'default',
        label: 'Default',
        render: DefaultColumnRenderer
      },
      {
        id: 'number',
        label: 'Number',
        render: NumberColumnRenderer,
      },
      {
        id: 'colored',
        label: 'Colored',
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
  const variation = props.extensions.variation;
  const Renderer = variation.view;

  return <Renderer {...props} />;
};

export default withBlockExtensions(TableBlockView);
```
