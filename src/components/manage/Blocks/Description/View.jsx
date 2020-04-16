/**
 * View description block.
 * @module components/manage/Blocks/Description/View
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * View description block class.
 * @class View
 * @extends Component
 */
const View = ({ properties }) => (
  <p className="documentDescription">{properties.description}</p>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
