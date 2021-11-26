# Images

Images are rendered with the Volto component `Image`.  
It renders images using Plone scales from [plone.app.imaging](https://github.com/plone/plone.app.imaging) and handles:

- Lazy load of images
- Loads the most correct one for current image size with `srcset`

## Usage

Basic example:

```jsx
import Image from '@plone/volto/components/theme/Image/Image';

<Image image={content.image} />

```

### Usage in a CT view or in a block

Example from NewsItem or Event default views, with some layout props:

```jsx
<Image
  image={content.image}
  className="document-image"
  size="medium"
  floated="right"
/>
```

### Usage in a listing block

Or in general, when dealing with catalog brains:

```jsx
<Image 
  image={item['@id']} 
  size="thumb" 
  imageField={item.image_field} 
  />
```

## Image props

| prop               | type                                  | required           | default | descirption                                                                    |
| ------------------ | ------------------------------------- | ------------------ | ------- | ------------------------------------------------------------------------------ |
| image              | object or string                      | :white_check_mark: |         | Plone image object or image url                                                |
| imageField         | string                                |                    | `image` | Image field (see https://github.com/plone/volto/pull/2731)                     |
| alt                | string                                |                    | `''`    | Alternative text for the image                                                 |
| className          | string                                |                    |         | CSS class for the image                                                        |
| containerClassName | string                                |                    |         | Additional CSS classes for the container picture element                       |
| floated            | `left` or `right`                     |                    |         | Float the image to left or right                                               |
| size               | `thumb`, `small`, `medium` or `large` |                    |         | Image size (CSS-level, not related to img resolution)                          |
| role               | string                                |                    | `img`   | img role attribute                                                             |
| critical           | boolean                               |                    | `false` | If true, it will render the actual image on SSR and it will not be lazy loaded |
| maxSize            | number                                |                    |         | Maximum size to render in pixel, will skip the larger ones                     |
| useOriginal        | boolean                               |                    | `false` | If true, it will includes the original size in srcset                          |

### Image prop

If it is an object, it assumes it is a Plone Image content object and it will render the scales it has inside.
Else if it is a string, it checks if it is an internal URL: if so, it will generate the scales URLs based on the settings in `config.settings.imageScales` which should match the ones in Plone imaging controlpanel (so in Plone registry).
If it is an external URL, it will set it as source for the image.
