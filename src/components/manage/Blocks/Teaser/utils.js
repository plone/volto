import { isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

export function getTeaserImageURL(href, image) {
  const imageScale =
    config.blocks.blocksConfig['teaser'].imageScale || 'preview';
  if (image) {
    if (isInternalURL(image['@id'])) {
      return `${image['@id']}/@@images/image/${imageScale}`;
    } else {
      return image['@id'];
    }
  } else {
    return `${href['@id']}/@@images/${
      href.image_field || 'preview_image'
    }/${imageScale}`;
  }
}
