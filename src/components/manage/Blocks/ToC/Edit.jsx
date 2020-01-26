/**
 * Edit toc block.
 * @module components/manage/Blocks/ToC/Edit
 */

import React from 'react';
import PropTypes from 'prop-types';

import View from './View';

/**
 * Edit toc block class.
 * @class Edit
 * @extends Component
 */
const Edit = ({ properties }) => <View properties={properties} />;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Edit;
