import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * Image component
 * @param {object} item - Context item that has the image field (can also be a catalog brain or summary)
 * @param {string} imageField - Key of the image field inside the item, or inside the image_scales object of the item if it is a catalog brain or summary
 * @param {string} alt - Alternative text for the image
 * @param {boolean} loading - (default: eager) set to `lazy` to lazy load the image
 */
export default function Image({
  item,
  imageField,
  alt = '',
  loading = 'eager',
  ...imageProps
}) {
  // TypeScript hints for editor autocomplete :)
  /** @type {React.ImgHTMLAttributes<HTMLImageElement>} */
  const attrs = {};

  const isFromRealObject = !item.image_scales;
  const imageFieldWithDefault = imageField || item.image_field || 'image';

  const image = isFromRealObject
    ? item[imageFieldWithDefault]
    : item.image_scales[imageFieldWithDefault]?.[0];

  if (!image) return null;

  const baseUrl = isFromRealObject ? '' : flattenToAppURL(item['@id'] + '/');

  attrs.src = `${baseUrl}${flattenToAppURL(image.download)}`;
  attrs.width = image.width;
  attrs.height = 'auto';
  attrs.style = {
    aspectRatio: `${image.width} / ${image.height}`,
    maxWidth: '100%',
    ...imageProps.style,
  };

  if (image.scales && Object.keys(image.scales).length > 0) {
    const sortedScales = Object.values(image.scales).sort((a, b) => {
      if (a.width > b.width) return 1;
      else if (a.width < b.width) return -1;
      else return 0;
    });

    attrs.srcSet = sortedScales
      .map(
        (scale) =>
          `${baseUrl}${flattenToAppURL(scale.download)} ${scale.width}w`,
      )
      .join(', ');
  }

  if (loading === 'lazy') {
    attrs.loading = 'lazy';
    attrs.decoding = 'async';
  } else {
    attrs.fetchpriority = 'high';
  }

  return <img {...attrs} alt={alt} {...imageProps} />;
}

Image.propTypes = {
  item: PropTypes.object.isRequired,
  imageField: PropTypes.string,
  alt: PropTypes.string.isRequired,
  loading: PropTypes.string,
};
