import { flattenToAppURL } from '@plone/volto/helpers';

const SIZE_MAPPING = {
  small: 'preview',
  medium: 'large',
  large: 'great',
};

const getImageType = (image) => {
  let imageType = 'external';
  if (Object.prototype.toString.call(image) === '[object Object]') {
    if (image['content-type'] === 'image/svg+xml') {
      imageType = 'svg';
    } else if (image.scales && Object.keys(image.scales).length > 0) {
      imageType = 'imageObject';
    }
  }
  return imageType;
};

/**
 * Get src-set list from image
 * @param {object | string} image - Image content object or url
 * @param {string} size - Size of image: can be small, medium, large, full
 * @returns {object} image attributes
 * @returns {string} image.src attributes src
 * @returns {string} image.srcset attributes srcset
 * @returns {string} image.width attributes width
 * @returns {string} image.height attributes height
 */
export const getImageAttributes = (image, size) => {
  let attrs = {
    src: '',
    srcSet: [],
  };
  let imageType = getImageType(image);

  switch (imageType) {
    case 'svg':
      attrs.src = flattenToAppURL(image.download);
      attrs.width = image.width;
      attrs.height = image.height;
      break;

    case 'imageObject':
      let sortedScales = Object.values(image.scales)
        .filter(
          (scale, index, array) =>
            index ===
            array.findIndex((foundItem) => foundItem.width === scale.width),
        ) // avoid duplicates if image is small and original is smaller than scale
        .sort((a, b) => {
          if (a.width > b.width) return 1;
          else if (a.width < b.width) return -1;
          else return 0;
        });

      // Use smallest size as fallback, which will also be the placeholder when lazy loading
      const minScale = sortedScales[0];
      attrs.src = minScale.download ?? image.download;

      const sizeScale = SIZE_MAPPING[size];
      // Use size for width/height if available. Otherwise use the biggest scale
      if (sizeScale && sizeScale in image.scales) {
        attrs.width = image.scales[sizeScale].width;
        attrs.height = image.scales[sizeScale].height;
      } else {
        const maxScale = sortedScales[sortedScales.length - 1];
        attrs.width = maxScale.width;
        attrs.height = maxScale.height;
      }

      attrs.srcSet = sortedScales.map(
        (scale) => `${flattenToAppURL(scale.download)} ${scale.width}w`,
      );

      break;

    // External URL or other element
    default:
      if (typeof image === 'string') {
        attrs.src = image;
      }
      break;
  }

  return attrs;
};
