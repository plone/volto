import React from 'react';
import {
  HeroImage,
  HeroText,
} from '@plone/volto/components/manage/Blocks/Hero/components';

const HeroImageRightTemplate = (props) => (
  <div className="block-inner-wrapper">
    <HeroText {...props} />
    <HeroImage {...props} />
  </div>
);

export default HeroImageRightTemplate;
