import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  flattenToAppURL,
  flattenScales,
  addPrefixPath,
} from '@plone/volto/helpers/Url/Url';

/**
 * Image component
 * @param {object} item - Context item that has the image field (can also be a catalog brain or summary)
 * @param {string} imageField - Key of the image field inside the item, or inside the image_scales object of the item if it is a catalog brain or summary
 * @param {string} src - URL of the image to be used if the item field is not available
 * @param {string} alt - Alternative text for the image
 * @param {boolean} loading - (default: eager) set to `lazy` to lazy load the image
 * @param {boolean} responsive - (default: false) set to `true` to add the `responsive` class to the image
 * @param {string} className - Additional classes to add to the image
 */
export default function Image({
  item,
  imageField,
  src,
  alt = '',
  loading = 'eager',
  responsive = false,
  className = '',
  ...imageProps
}) {
  if (!item && !src) return null;

  // TypeScript hints for editor autocomplete :)
  /** @type {React.ImgHTMLAttributes<HTMLImageElement>} */
  const attrs = {};
  attrs.className = cx(className, { responsive }) || undefined;

  if (!item && src) {
    attrs.src = addPrefixPath(src);
  } else {
    const isFromRealObject = !item.image_scales;
    const imageFieldWithDefault = imageField || item.image_field || 'image';

    const image = isFromRealObject
      ? flattenScales(item['@id'], item[imageFieldWithDefault])
      : flattenScales(
          item['@id'],
          item.image_scales[imageFieldWithDefault]?.[0],
        );

    if (!image) return null;

    const isSvg = image['content-type'] === 'image/svg+xml';
    // In case `base_path` is present (`preview_image_link`) use it as base path
    const basePath = addPrefixPath(
      flattenToAppURL(image.base_path || item['@id']),
    );
    attrs.src = `${basePath}/${image.download}`;
    attrs.width = image.width;
    attrs.height = image.height;

    if (!isSvg && image.scales && Object.keys(image.scales).length > 0) {
      const sortedScales = Object.values({
        ...image.scales,
        original: {
          download: `${image.download}`,
          width: image.width,
          height: image.height,
        },
      }).sort((a, b) => {
        if (a.width > b.width) return 1;
        else if (a.width < b.width) return -1;
        else return 0;
      });

      attrs.srcSet = sortedScales
        .map((scale) => `${basePath}/${scale.download} ${scale.width}w`)
        .join(', ');
    }
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
  item: PropTypes.shape({
    '@id': PropTypes.string,
    image_field: PropTypes.string,
    image_scales: PropTypes.object,
    image: PropTypes.object,
  }),
  imageField: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  loading: PropTypes.string,
  responsive: PropTypes.bool,
  className: PropTypes.string,
};
