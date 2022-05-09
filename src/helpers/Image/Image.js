import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const getImageType = (image) => {
  let imageType = 'external';
  if (image['content-type'] === 'image/svg+xml') {
    imageType = 'svg';
  } else if (
    Object.prototype.toString.call(image) === '[object Object]' &&
    image.scales &&
    Object.keys(image.scales).length > 0
  ) {
    imageType = 'imageObject';
  } else if (typeof image === 'string' && isInternalURL(image)) {
    imageType = 'internalUrl';
  }
  return imageType;
};

/**
 * Get src-set list from image
 * @param {object | string} image - Image content object or url
 * @param {object} options
 * @param {number} options.maxSize - maximum size to render
 * @param {boolean} options.useOriginal - whether to render original img
 * @returns {object} image attributes
 * @returns {string} image.src attributes.src
 * @returns {string} image.srcset attributes.srcset
 */

const DEFAULT_MAX_SIZE = 10000;
export const getImageAttributes = (
  image,
  {
    imageField = 'image',
    maxSize = DEFAULT_MAX_SIZE,
    useOriginal = false,
    minSize = 0,
  } = {},
) => {
  const imageScales = config.settings.imageScales;

  const minScale = Object.keys(imageScales).reduce((minScale, scale) => {
    if (!minScale || imageScales[scale] < imageScales[minScale]) {
      if (minSize > 0 && minSize > imageScales[scale]) {
        return minScale;
      }
      return scale;
    }
    return minScale;
  }, null);

  let attrs = {};
  let imageType = getImageType(image);

  switch (imageType) {
    case 'svg':
      attrs.src = flattenToAppURL(image.download);
      break;

    // Scales object from Plone restapi
    // ideal use of Plone images
    case 'imageObject':
      let sortedScales = Object.values(image.scales)
        .filter((scale) => scale.width <= maxSize)
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

      const scale = sortedScales[0];
      attrs.src = scale?.download ?? image.download;
      attrs.aspectRatio = Math.round((image.width / image.height) * 100) / 100;

      if (maxSize !== DEFAULT_MAX_SIZE) {
        const maxScale = sortedScales[sortedScales.length - 1];
        attrs.width = maxScale.width;
        attrs.height = maxScale.height;
      }

      attrs.srcSet = sortedScales.map(
        (scale) => `${flattenToAppURL(scale.download)} ${scale.width}w`,
      );

      if (useOriginal || sortedScales?.length === 0)
        attrs.srcSet = attrs.srcSet.concat(
          `${flattenToAppURL(image.download)} ${image.width}w`,
        );
      break;

    // Internal URL
    case 'internalUrl':
      let baseUrl = `${flattenToAppURL(image.split('/@@images')[0])}${
        image.endsWith('/') ? '' : '/'
      }@@images/${imageField}`;
      attrs.src = `${baseUrl}/${minScale}`;

      attrs.srcSet = Object.keys(imageScales)
        .sort((a, b) => {
          if (imageScales[a] > imageScales[b]) return 1;
          else if (imageScales[a] < imageScales[b]) return -1;
          else return 0;
        })
        .reduce((srcSet, scale) => {
          if (imageScales[scale] <= maxSize) {
            return [...srcSet, `${baseUrl}/${scale} ${imageScales[scale]}w`];
          } else return srcSet;
        }, []);

      if (useOriginal) attrs.srcSet = attrs.srcSet.concat(`${baseUrl} 1900w`); // expect that is for desktop screens, I don't have actual size
      break;

    // External URL or other element
    default:
      attrs.src = typeof image === 'string' ? image : null;
      break;
  }

  return attrs;
};
