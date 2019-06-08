/**
 * View image tile.
 * @module components/manage/Tiles/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from '~/config';
import ImageZoom from 'react-medium-image-zoom';

import { flattenToAppURL } from '../../../../helpers';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <p
    className={cx(
      'tile image align',
      {
        center: !Boolean(data.align),
      },
      data.align,
    )}
  >
    <ImageZoom
      image={{
        src: data.url.startsWith(settings.apiPath)
          ? `${flattenToAppURL(data.url)}/@@images/image`
          : data.url,
        alt: '',
        className: 'ui image',
      }}
      zoomImage={{
        src: data.url.startsWith(settings.apiPath)
          ? `${flattenToAppURL(data.url)}/@@images/image`
          : data.url,
        alt: '',
      }}
    />
  </p>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
