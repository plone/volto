# Images

The goals for optimizing images are:

- serving proper size images to the client (using `srcset`s)
- lazy loading images

The most basic example of image usage is an image block, or an image in Tinymce if using Classic UI.
In both situations the user usually defines an alignment and a size for the image.

The alignment can be: left, centered, right, or full width.

The size can be: small, medium, large.
Depending on the site layout and design, these sizes can be fixed (in pixels) or fluid (in percentages).

## Serving the right image size

In order to achieve the first goal, images have to be rendered using a `picture` element and a `source` element with a `srcset` attribute.

```html
<picture>
  <source
    srcset="
      /image-400-uuid.jpg   400w,
      /image-600-uuid.jpg   600w,
      /image-800-uuid.jpg   800w,
      /image-1000-uuid.jpg 1000w,
      /image-1200-uuid.jpg 1200w
    "
    sizes="100vw"
  />
  <img
    src="/image-placeholder.jpg"
    alt="Alt text"
    role="img"
    width="960"
    height="600"
  />
</picture>
```

This will allow the browser to choose the proper size to download from the server.

### Width and height

The important thing to note here is that we provide width and height in the `img` tag, those are used by the browser to define which space the image will take and avoid layout shift while loading the page. These information are to be taken from the backend. The backend will provide urls for each size for the `srcset` and the width and height attribute for each one.

The size of the image chosen by the user defines which of the combinations of width and height are used among those served by the backend.

### Other discussion points

_Should we render in the `srcset` the sizes that are bigger than the chosen one?_

_In fluid layouts, the alignment decision made by the user will impact the actual width of the image, based on CSS rules. Should this be taken into account for `srcset` rendering?_

Sizes are defined in the Volto config, or in the Tinymce controlpanel if using Classic UI.

## Lazy loading

Lazy loading can be achieved in Volto by rendering the `srcset` attribute only when the user scrolling the page gets close to the image. The placeholder is shown until then. An `IntersectionObserver` can take care of that.

As a placeholder, we can use the smallest available image size provided by the backend (the `listing` scale at the time of this writing), which results in a blurred light version of the final image. The `width` and `height` attributes on the placeholder still need to be the ones of the final image.
