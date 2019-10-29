/**
 * View map tile.
 * @module components/manage/Tiles/Maps/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */

const View = ({ data }) => (
  <p
    className={cx(
      'tile maps align',
      {
        center: !Boolean(data.align),
      },
      data.align,
    )}
  >
    <div
      className={cx('video-inner', {
        'full-width': data.align === 'full',
      })}
    >
      <iframe
        title="Embeded Google Maps"
        src={data.url}
        className="google-map"
        frameBorder="0"
        allowFullScreen
      />
    </div>
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
