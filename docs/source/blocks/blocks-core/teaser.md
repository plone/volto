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

Volto comes with a Teaser block that given a content object as target is able to pull information from it and show it in the block.
By default, this information is the `title`, `description`, `preview_image` and shows them in a summary (Image on left, title, description) way.

## Blocks settings

The Teaser has the following settings:

Target
: The target is either an existing content item in your Plone site that can be selected by clicking the list icon, or an external URL that can be typed into the text field and saved by clicking the right arrow when it appears after you start typing.

Title
: The title is the title of the content item.

Head title
: The head title is a heading that appears above the title.

Description
: The description is plain text that summarizes or describes the content item.

Image override
: The image override is either an existing image in your Plone site that can be selected by clicking the list icon, or an external URL of an image that can be typed into the text field and saved by clicking the right arrow when it appears after you start typing.

## Style Wrapper Properties

The Teaser has a styling property to align the image. The image can be aligned left (default), right and top.

The styling wrapper properties can be extended using: {ref}`blocks-style-wrapper-label`

## Variations

By default, the Teaser have a default variation, but this can be extended using block variations

The variations can be extended using: {ref}`extensions-block-variations`

## Data Adapter

The Teaser has a data adapter function that allows you to tap into the changes in the settings, and being able to issue changes in other settings fields.
This is valuable in the Teaser block because it saves an internal cache of the target element.
If you select the target, these values are updated. Also, when you update the target, these values remain (default behavior), but you can issue another behavior.

The data adapter function is defined in the block's settings `dataAdapter`, so you can override it and add your own, if required.
This is the default adapter (you should stick to his signature):

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

The Teaser block looks up for a couple of components in the registry, that you can provide in case that you want to modify the default behavior.

### Image component

The image component used in the Teaser can be overriden using your own custom image component.
By default, it uses a simple `<img />` tag, with this signature:

```jsx
<Image
  src={hasImageComponent ? href : defaultImageSrc}
  alt=""
  loading="lazy"
/>
```

### Content type dependant Body component

The Teaser component supports specifying a custom component depending on the target content type.

You can provide your own component registering a component like in your add-on config:

```js
import NewsItem from './components/Blocks/Teaser/NewsItem';

...

  config.registerComponent({
    name: 'Teaser',
    component: NewsItem,
    dependencies: 'News Item',
  });
```

The `name` must be `Teaser` but then, as a dependency, you must provide the name of the content type.

After this, if you select a content type `News Item` as target of the teaser, the `Body` component used will be `NewsItem` instead of the default one.

## Custom Body component

The Teaser body provides a default `Body` component that can be overriden.
Although it can be done via component shadowing, it is recommended that you override it using the `variations` block settings field.

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

From Volto 16.14.0 the Teaser block as it's in `volto-blocks-grid` add-on version 7.0.0 is included in Volto core.

Because of the add-on config priority, if you have `volto-blocks-grid` installed in your project, the Teaser block from the add-on (and your project amendments to the config, if any) will be applied and used.

In case you want to use the core one, you need to re-apply the core configuration for the Teaser block in your project or add-ons.
