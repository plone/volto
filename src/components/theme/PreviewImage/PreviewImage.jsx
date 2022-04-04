import React from 'react';
import PropTypes from 'prop-types';

import Image from '@plone/volto/components/theme/Image/Image';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';

/**
 * Renders a preview image for a catalog brain result item.
 *
 */
function PreviewImage(props) {
  const { item, size = 'preview', alt, ...rest } = props;

  return item.image_field ? (
    <Image
      image={item['@id']}
      size={size}
      imageField={item.image_field}
      alt={alt ?? item.title}
      {...rest}
    />
  ) : (
    <img src={DefaultImageSVG} alt={alt ?? item.title} {...rest} />
  );
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
