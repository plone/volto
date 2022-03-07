import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { flattenToAppURL } from '@plone/volto/helpers';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';

/**
 * Renders a preview image for a catalog brain result item.
 *
 */
function PreviewImage(props) {
  const { item, size = 'preview', cover, ...rest } = props;
  const src = item.image_field
    ? flattenToAppURL(`${item['@id']}/@@images/${item.image_field}/${size}`)
    : DefaultImageSVG;

  return cover ? (
    <img
      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
      style={{ backgroundImage: `url("${src}")` }}
      alt={item.title}
      className={cx('preview-image', size)}
    />
  ) : (
    <img src={src} alt={item.title} {...rest} />
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
