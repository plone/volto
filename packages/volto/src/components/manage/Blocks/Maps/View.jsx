/**
 * View map block.
 * @module components/manage/Blocks/Maps/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Body from '@plone/volto/components/manage/Blocks/Maps/Body';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
  const { data, className } = props;

  return (
    <div
      className={cx(
        'block maps align',
        {
          center: !Boolean(data.align),
        },
        data.align,
        className,
      )}
    >
      <Body data={data} />
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
};

export default withBlockExtensions(View);
