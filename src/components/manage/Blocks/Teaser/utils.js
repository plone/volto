import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

export function getTeaserImageURL({ href, image, align }) {
  // The default scale used in teasers is the 'teaser' scale
  // except if it's customized otherwise in the teaser block settings
  // or if the teaser is center (top)
  const imageScale =
    align === 'center'
      ? 'great'
      : config.blocks.blocksConfig['teaser'].imageScale || 'teaser';

  if (image) {
    // If the image is overriden locally in the teaser block
    if (isInternalURL(image['@id'])) {
      // If it's internal check if image_scales catalog info is present
      if (image?.image_scales?.[image?.image_field]) {
        return `${image['@id']}/${
          image.image_scales[image.image_field]?.[0].scales[imageScale]
            ?.download || image.image_scales[image.image_field]?.[0].download
        }`;
      } else {
        // If not, fallback to content scale URL shortcut
        return `${image['@id']}/@@images/${image.image_field}/${imageScale}`;
      }
    } else {
      // If it's external, return the plain URL
      return image['@id'];
    }
  } else {
    // If the image is not overriden
    if (href?.image_scales?.[href?.image_field]) {
      return `${href['@id']}/${
        href.image_scales[href.image_field]?.[0].scales[imageScale]?.download ||
        href.image_scales[href.image_field]?.[0].download
      }`;
    } else {
      // If not, fallback to content scale URL shortcut
      return `${href['@id']}/@@images/${
        href.image_field || 'preview_image'
      }/${imageScale}`;
    }
  }
}

export const dataMinusOverwrites = (resp, data) => {
  let hrefData = {
    '@id': flattenToAppURL(resp['@id']),
    '@type': resp?.['@type'],
    Description: resp?.description,
    Title: resp.title,
    hasPreviewImage: resp?.preview_image ? true : false,
    head_title: resp.head_title ?? null,
    image_field: resp?.preview_image
      ? 'preview_image'
      : resp?.image
      ? 'image'
      : null,
    image_scales: {
      preview_image: [resp?.preview_image],
      image: [resp?.image?.image],
    },
    title: resp.title,
  };
  let blockData = {
    '@type': data['@type'],
    description: resp?.description,
    overwritten: data.overwritten,
    head_title: resp?.head_title,
    href: [hrefData],
    styles: data.styles,
    title: resp.title,
  };
  return blockData;
};
