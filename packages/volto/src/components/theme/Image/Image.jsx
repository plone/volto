import PropTypes from 'prop-types';
import { buildImageAttrs } from './utils';

import { useMemo } from 'react';

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
  src = '',
  alt = '',
  loading = 'eager',
  responsive = false,
  className = '',
  ...imageProps
}) {
  const baseSrc = useMemo(() => {
    return src ? src.split('?')[0] : null;
  }, [src]);

  const attrs = useMemo(() => {
    return buildImageAttrs({
      item,
      src,
      className,
      responsive,
      loading,
      imageField,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, baseSrc, className, responsive, loading, imageField]);

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
