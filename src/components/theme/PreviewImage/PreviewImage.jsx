import React from 'react';
import PropTypes from 'prop-types';

import { flattenToAppURL } from '@plone/volto/helpers';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';

/**
 * Renders a preview image for a catalog brain result item.
 *
 */
function PreviewImage(props) {
  const { item, size = 'preview', alt, ...rest } = props;
  if (item.image_field) {
    const { width, height } =
      item.image_scales?.[item.image_field]?.[0]?.scales[size] ?? {};

    return (
      <img
        src={flattenToAppURL(
          `${item['@id']}/@@images/${item.image_field}/${size}?modified=${item.modified}`,
        )}
        alt={alt ?? item.title}
        {...rest}
        width={width}
        height={height}
      />
    );
  } else {
    return (
      <img
        src={DefaultImageSVG}
        alt={alt ?? item.title}
        {...rest}
        width="400"
        height="300"
      />
    );
  }
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
