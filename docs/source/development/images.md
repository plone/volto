---
myst:
  html_meta:
    "description": "Volto code recipe for images"
    "property=og:description": "Volto code recipe for images"
    "property=og:title": "Volto code recipe for images"
    "keywords": "Plone, Volto, code, recipe, images"
---

(images-label)=

# Images

Volto comes with an `Image` component that loads images in an optimal way.

Features of the `Image` component are the following.

- optimized [lazy loading](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading)
- automatic `srcset` generation, if given a content item or catalog brain
- optional responsive width

The component can accept all the regular HTML `<img>` attributes and a few extra for the above features.
The following example demonstrates how the code with attributes will render to HTML.

```jsx
import config from '@plone/volto/registry';

const Image = config.getComponent({ name: 'Image' }).component;

<Image
  src="https://picsum.photos/200/300"
  alt="Alt text for accessibility"
  className="myClass"
  width="200"
  height="300"
/>;
```

```html
<img
  src="https://picsum.photos/200/300"
  alt="Alt text for accessibility"
  class="myClass"
  width="200"
  height="300"
/>
```

Setting the `loading="lazy"` attribute to the `Image` component also adds the `decoding="async"` attribute.
The [`async`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding) attribute decodes the image asynchronously to reduce delay in presenting other content.

To render an image from a content object, you can use the component as shown in the following code snippet.

```jsx
<Image item={content} imageField="image" alt="Alt text for accessibility" />
```

This will generate the `src`, `srcset`, `width`, and `height` attributes automatically for the given image.

To make the image width responsive, you can add the prop `responsive`, and the literal `responsive` will be added to the HTML attribute `class`.

## Serving the right image size

To serve the proper image size for the viewer's device, you should add a `sizes` attribute to the `Image` component while rendering.
This responsibility is left to the developer because it depends on where the image is rendered.

For example, if the image is rendered in a container that is always half as wide as the page, the `sizes` attribute should reflect that to properly inform the browser which image size to request and render.

```jsx
<Image
  item={content}
  imageField="image"
  alt="Alt text for accessibility"
  sizes="50vw"
/>
```

If the image is rendered at full viewport width when the viewport is less than `900px` wide, though, you can add a media condition to the `sizes` attribute.

```jsx
<Image
  item={content}
  imageField="image"
  alt="Alt text for accessibility"
  sizes="(max-width: 900px) 100vw, 50vw"
/>
```

More information on this subject can be found at the following resources.

- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- https://www.builder.io/blog/fast-images
