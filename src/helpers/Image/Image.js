import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

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
export const getImageAttributes = (
  image,
  { imageField = 'image', maxSize = 10000, useOriginal = false } = {},
) => {
  const imageScales = config.settings.imageScales;
  const minSize = Object.keys(imageScales).reduce((minSize, scale) => {
    if (!minSize || imageScales[scale] < imageScales[minSize]) {
      return scale;
    }

    return minSize;
  }, null);

  let attrs = {};
  let imageType = 'external';
  if (image['content-type'] === 'image/svg+xml') imageType = 'svg';
  else if (
    Object.prototype.toString.call(image) === '[object Object]' &&
    image.scales &&
    Object.keys(image.scales).length > 0
  )
    imageType = 'imageObject';
  else if (typeof image === 'string' && isInternalURL(image))
    imageType = 'internalUrl';

  switch (imageType) {
    case 'svg':
      attrs.src = flattenToAppURL(image.download);
      break;

    // Scales object from Plone restapi
    // ideal use of Plone images
    case 'imageObject':
      let sortedScales = Object.values(image.scales)
        .filter((scale) => scale.width <= maxSize)
        .filter((scale) => scale.width < image.width) // avoid duplicates if image is small and original is smaller than scale
        .sort((a, b) => {
          if (a.width > b.width) return 1;
          else if (a.width < b.width) return -1;
          else return 0;
        });
      attrs.src = sortedScales[0]?.download ?? image.download;
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
      attrs.src = `${baseUrl}/${minSize}`;
      attrs.srcSet = Object.keys(imageScales).reduce((srcSet, scale) => {
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
