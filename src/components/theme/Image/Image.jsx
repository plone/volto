import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * Image component
 * @param {object | string} image - Plone image as object or url
 * @param {string} baseUrl - Base URL of the image item (the part before /@@images)
 * @param {string} alt - Alternative text for the image
 * @param {boolean} loading - (default: eager) set to `lazy` to lazy load the image
 */
export default function Image({
  image,
  baseUrl = '',
  alt = '',
  loading = 'eager',
  ...imageProps
}) {
  // TypeScript hints for editor autocomplete :)
  /** @type {React.ImgHTMLAttributes<HTMLImageElement>} */
  const attrs = {};

  let imageType = 'external';
  /**
   * Same result as checking `typeof image === 'object' && !Array.isArray(image)`
   * but in just one call
   */
  if (Object.prototype.toString.call(image) === '[object Object]') {
    if (image['content-type'] === 'image/svg+xml') {
      imageType = 'svg';
    } else if (image.scales && Object.keys(image.scales).length > 0) {
      imageType = 'imageObject';
    }
  }

  if (imageType === 'external' && typeof image === 'string') {
    attrs.src = image;
  } else {
    attrs.src = flattenToAppURL(image.download);
    attrs.width = image.width;
    attrs.height = image.height;
    attrs.style = {
      aspectRatio: `${image.width} / ${image.height}`,
      ...imageProps.style,
    };

    if (imageType === 'imageObject') {
      attrs.src = image.download;

      const sortedScales = Object.values(image.scales).sort((a, b) => {
        if (a.width > b.width) return 1;
        else if (a.width < b.width) return -1;
        else return 0;
      });

      const useBaseUrl = image.download.startsWith('@@images');

      attrs.srcSet = sortedScales
        .map(
          (scale) =>
            `${useBaseUrl ? baseUrl : ''}${flattenToAppURL(scale.download)} ${
              scale.width
            }w`,
        )
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
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  baseUrl: PropTypes.string,
  alt: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};
