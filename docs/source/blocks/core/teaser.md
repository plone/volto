---
myst:
  html_meta:
    "description": "Volto Teaser Block description and developer notes"
    "property=og:description": "Volto Teaser Block description and developer notes"
    "property=og:title": "Volto Teaser Block"
    "keywords": "Volto, React, blocks, teaser, Plone"
---

(teaser-block)=

# Teaser Block

```{versionadded} Volto 16.14.0
```

Volto comes with a Teaser block, which when given a content object as a target, is able to pull information from the targeted content object and show it in the block.
By default, this information includes the `title`, `description`, `head_title`, and `preview_image` fields.
It shows them in a summary layout, with the image on the left, and the head title, title, and description on the right in order from top to bottom.

## Settings

The Teaser has the following settings:

Target
: The target is either an existing content item in your Plone site, or an external URL

Title
: The title is the title of the Teaser block.
By default is copied over from the Teaser target.

Head title
: The head title is a heading that appears above the title of the Teaser Block.
By default is copied over from the Teaser target.

Description
: The description is plain text that summarizes or describes the Teaser.
By default is copied over from the Teaser target.

Image override
: The image override is either an existing image in your Plone site, or an external URL.
It overrides the image provided by the Teaser target.

## Style wrapper properties

The Teaser has a styling property to align the image.
The image can be aligned to the left (default), right, or top.

The styling wrapper properties can be extended using the {ref}`block-style-wrapper-label`.

## Variations

A Teaser block has a default variation.
A variation can be extended using {ref}`extensions-block-variations`.

## Data adapter

The Teaser has a data adapter function that allows you to both tap into the changes in the settings and issue changes in other settings fields.
This is valuable in the Teaser block because it saves an internal cache of the target element.
If you select the target, these values are updated.
When you update the target, by default these values remain, but you can issue another behavior.

The data adapter function is defined in the block's setting `dataAdapter`.
You can override it and add your own function, if required.
The following is the default adapter.
You should stick to this signature in your custom adapters.

```js
import { isEmpty } from 'lodash';

export const TeaserBlockDataAdapter = ({
  block,
  data,
  id,
  onChangeBlock,
  value,
}) => {
  let dataSaved = {
    ...data,
    [id]: value,
  };
  if (id === 'href' && !isEmpty(value) && !data.title && !data.description) {
    dataSaved = {
      ...dataSaved,
      title: value[0].Title,
      description: value[0].Description,
      head_title: value[0].head_title,
    };
  }
  onChangeBlock(block, dataSaved);
};
```

## Custom components in registry

The Teaser block looks up a couple of components in the {ref}`component-registry` that you can provide in case you want to modify the default behavior.

### Image component

The image component used in the Teaser can be overridden using your own custom image component.
By default, it uses an `<img />` tag with the following signature.

```jsx
<Image
  src={hasImageComponent ? href : defaultImageSrc}
  alt=""
  loading="lazy"
/>
```

You can register your as:

```js
  import Image from './components/Image/MyImageComponent';

  ...

  config.registerComponent({
    name: 'Image',
    component: Image,
  });
```

### Content type dependent `Body` component

The Teaser component supports specifying a custom component depending on the target content type.

You can provide your own component, registering a component, for example, in your add-on configuration as shown below.

```js
import NewsItem from './components/Blocks/Teaser/NewsItem';

...

  config.registerComponent({
    name: 'Teaser',
    component: NewsItem,
    dependencies: 'News Item',
  });
```

The `name` must be `Teaser`, but then as a dependency you must provide the name of the content type.

After this, if you select a content type `News Item` as the target of the teaser, the `Body` component used will be `NewsItem` instead of the default one.

## Custom `Body` component

The Teaser body provides a default `Body` component that can be overridden.
Although it can be done via component shadowing, it is recommended that you override it using the `variations` block setting field.

```js
import CustomTeaserBlockDefaultBody from './components/Blocks/Teaser';

...

    variations: [
      {
        id: 'default',
        isDefault: true,
        title: 'Default',
        template: CustomTeaserBlockDefaultBody,
      },
    ],
```

The custom content type `Body` component mentioned in the previous section is compatible with this customization.
In this case, the content type customization will take precedence, if it matches with the content type of the target.

## Migration from `volto-blocks-grid`

From Volto 16.14.0 the Teaser block, as it's in the `volto-blocks-grid` add-on version 7.0.0, is included in Volto core.

Because of the add-on configuration priority, if you have `volto-blocks-grid` installed in your project, the Teaser block from the add-on (and your project amendments to the configuration, if any) will be applied and used.

In case you want to use the core Teaser block, you need to re-apply the core configuration for the Teaser block in your project or add-ons.
