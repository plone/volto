import React from 'react';
import {
  HeroImage,
  HeroText,
} from '@plone/volto/components/manage/Blocks/Hero/components';

const HeroImageBottomTemplate = (props) => (
  <div className="block-inner-wrapper flex-column">
    <HeroText {...props} />
    <HeroImage {...props} />
  </div>
);

export default HeroImageBottomTemplate;
