# Images

Volto comes with an Image component that allows to load images in an optimal way.

Features of the Image component are:

- optimized lazy loading
- automatic `srcset` generation, if given a content item or catalog brain
- optional responsive width

The component can accept all the regular html `<img>` attributes, as well as a few extra for the features described above.

Setting the `loading="lazy"` attribute to the Image component also adds the `decoding="async"` attribute which is generally considered an improvement when loading images lazily.

In order to render an image from a content object, you would use the component like this:

```javascript
import { Image } from '@plone/volto/components';

<Image item={content} imageField="image" alt="" />;
```

This will generate the `src`, `srcset`, `width` and `height` attributes automatically for the given image.

If the `responsive` prop is added, a class is applied that will make the image width responsive.

## Serving the right image size

In order to serve the proper image size in every situation, a `sizes` attribute should be added to the Image component while rendering, this responsibility is left to the developer because it depends on where the image is rendered.

For example, if the image is rendered in a container that is always half as wide as the page, the `sizes` attribute should reflect that in order to properly inform the browser.

```javascript
<Image item={content} imageField="image" alt="" sizes="50vw" />
```

If the image is rendered at full viewport width when the viewport is less than 900px wide, though, you can add a media condition to the `sizes` attribute.

```javascript
<Image
  item={content}
  imageField="image"
  alt=""
  sizes="(max-width: 900px) 100vw, 50vw"
/>
```

More info on this subject can be found at:

- <https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images>
- <https://www.builder.io/blog/fast-images>
