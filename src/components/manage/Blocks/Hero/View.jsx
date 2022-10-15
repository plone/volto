/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withBlockExtensions } from '@plone/volto/helpers';
import { HeroBody } from '@plone/volto/components';
import cx from 'classnames';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
export const View = (props) => {
  return (
    <div className={cx('block hero align', props.data.align)}>
      <HeroBody {...props}></HeroBody>
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
