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
          // we keep the default alignment of the original hero block
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
