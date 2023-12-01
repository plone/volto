/**
 * View video block.
 * @module components/manage/Blocks/Video/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import Body from '@plone/volto/components/manage/Blocks/Video/Body';
import { withBlockExtensions } from '@plone/volto/helpers';
import cx from 'classnames';

/**
 * View video block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
  const { data, className } = props;
  return (
    <div
      className={cx(
        'block video align',
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
