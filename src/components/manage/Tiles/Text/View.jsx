/**
 * View text tile.
 * @module components/manage/Tiles/Text/View
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * View text tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <p dangerouslySetInnerHTML={{ __html: data.text.data }} />
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
