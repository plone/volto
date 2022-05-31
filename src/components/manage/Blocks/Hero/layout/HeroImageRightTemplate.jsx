import React from 'react';
import {
  HeroImage,
  HeroText,
  HeroToolbar,
} from '@plone/volto/components/manage/Blocks/Hero/components';

const HeroImageRightTemplate = (props) => (
  <div className="block-inner-wrapper">
    <HeroToolbar {...props} className="toolbar-right" />
    <HeroText {...props} />
    <HeroImage {...props} />
  </div>
);

export default HeroImageRightTemplate;
