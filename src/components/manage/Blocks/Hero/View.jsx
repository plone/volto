/**
 * View hero block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { HeroBody } from '@plone/volto/components';
import cx from 'classnames';

export const View = (props) => {
  const { data } = props;
  return (
    <div
      className={cx(
        'block hero align',
        {
          // add backwards compatibility since the original hero was left aligned
          left: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <HeroBody {...props}></HeroBody>
    </div>
  );
};

export default withBlockExtensions(View);
