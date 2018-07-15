/**
 * View image tile.
 * @module components/manage/Tiles/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <p
    className={['tile', 'image', 'align', data.align]
      .filter(e => !!e)
      .join(' ')}
  >
    <Image src={`${data.url}/@@images/image`} alt="" />
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
