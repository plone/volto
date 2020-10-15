/**
 * Edit toc block.
 * @module components/manage/Blocks/ToC/Edit
 */

import React from 'react';
import PropTypes from 'prop-types';

import View from '@plone/volto/components/manage/Blocks/ToC/View';

/**
 * Edit toc block class.
 * @class Edit
 * @extends Component
 */
const Edit = ({ properties, data }) => (
  <View properties={properties} data={data} />
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any),
};

export default Edit;
