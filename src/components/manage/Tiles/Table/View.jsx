/**
 * View table tile.
 * @module components/manage/Tiles/Table/View
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * View table tile class.
 * @class View
 * @extends Component
 */
const View = ({ props }) => <span>table</span>;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  props: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
