import { flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';

/**
 * Get src-set list from image
 * @param {object | string} image - Image content object or url
 * @param {number} maxSize - Maximum size of the image
 */
export const getSrcSet = (image, maxSize) => {
  const SRCSET = settings.imageScales;
  let srcsetList = [];
  let maxWidth = maxSize ? SRCSET[maxSize] : 0;

  if (
    Object.prototype.toString.call(image) === '[object Object]' &&
    image.scales &&
    Object.keys(image.scales).length > 0
  ) {
    Object.keys(SRCSET).forEach((size) => {
      if (maxWidth === 0 || SRCSET[size] <= maxWidth) {
        srcsetList.push(
          flattenToAppURL(image.scales[size]?.download) +
            ' ' +
            SRCSET[size] +
            'w',
        );
      }
    });
  }

  if (typeof image === 'string') {
    let src =
      image.indexOf('@@images/') >= 0
        ? image.substring(0, image.indexOf('@@images/'))
        : image;

    Object.keys(SRCSET).forEach((size) => {
      if (maxWidth === 0 || SRCSET[size] <= maxWidth) {
        srcsetList.push(
          flattenToAppURL(src) +
            '@@images/image/' +
            size +
            ' ' +
            SRCSET[size] +
            'w',
        );
      }
    });
  }

  return {
    srcSet: srcsetList.length > 0 ? srcsetList.join(', ') : null,
    sizes: maxSize && srcsetList.length > 0 ? `${SRCSET[maxSize]}px` : null,
  };
};
