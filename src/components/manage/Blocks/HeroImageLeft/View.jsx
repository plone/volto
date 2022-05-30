/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Hero } from '@plone/volto/components';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
export const View = (props) => {
  return (
    <div className="block hero">
      <Hero {...props}></Hero>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
  variation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withBlockExtensions(View);
