import React from 'react';
import {
  HeroImage,
  HeroText,
} from '@plone/volto/components/manage/Blocks/Hero/components';

const HeroImageLeftTemplate = (props) => (
  <div className="block-inner-wrapper">
    <HeroImage {...props} />
    <HeroText {...props} />
  </div>
);

export default HeroImageLeftTemplate;
