/**
 * View html tile.
 * @module components/manage/Tiles/HTML/View
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * View html tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <p>
    <div dangerouslySetInnerHTML={{ __html: data.html }} />
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
