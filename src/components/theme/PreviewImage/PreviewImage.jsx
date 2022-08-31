import React from 'react';
import PropTypes from 'prop-types';

import { flattenToAppURL } from '@plone/volto/helpers';
import { Image } from '@plone/volto/components';
import config from '@plone/volto/registry';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';

/**
 * Renders a preview image for a catalog brain result item.
 *
 */
function PreviewImage(props) {
  const { item, size = 'preview', alt, ...rest } = props;
  const src = item.image_field
    ? flattenToAppURL(`${item['@id']}/@@images/${item.image_field}/${size}`)
    : config.getComponent({
        name: 'DefaultImage',
        dependencies: ['listing', 'summary'],
      }).component || DefaultImageSVG;

  return <Image src={src} alt={alt ?? item.title} {...rest} />;
}

PreviewImage.propTypes = {
  size: PropTypes.string,
  item: PropTypes.shape({
    '@id': PropTypes.string.isRequired,
    image_field: PropTypes.string,
    title: PropTypes.string.isRequired,
  }),
};

export default PreviewImage;
