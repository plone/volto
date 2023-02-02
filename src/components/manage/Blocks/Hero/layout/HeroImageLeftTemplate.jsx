import React from 'react';
import {
  HeroImage,
  HeroText,
  HeroToolbar,
} from '@plone/volto/components/manage/Blocks/Hero/components';

const HeroImageLeftTemplate = (props) => (
  <div className="block-inner-wrapper">
    <HeroToolbar {...props} className="toolbar-left" />
    <HeroImage {...props} />
    <HeroText {...props} />
  </div>
);

export default HeroImageLeftTemplate;
