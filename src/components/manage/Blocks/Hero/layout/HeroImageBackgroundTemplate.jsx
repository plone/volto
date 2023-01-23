import React from 'react';
import {
  HeroImage,
  HeroText,
} from '@plone/volto/components/manage/Blocks/Hero/components';
import cx from 'classnames';

const HeroImageBackgroundTemplate = (props) => (
  <div
    className={cx(
      'block-inner-wrapper',
      'withBackroundImage',
      props.data.align || 'center',
    )}
  >
    <HeroImage withBackgroundImage {...props} />
    <HeroText withBackgroundImage {...props} />
  </div>
);

export default HeroImageBackgroundTemplate;
