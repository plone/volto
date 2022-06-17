import React from 'react';
import {
  HeroImage,
  HeroText,
  HeroToolbar,
} from '@plone/volto/components/manage/Blocks/Hero/components';

const HeroImageBottomTemplate = (props) => (
  <div className="block-inner-wrapper flex-column">
    <HeroText {...props} />
    <HeroToolbar {...props} className="toolbar-middle" />
    <HeroImage {...props} />
  </div>
);

export default HeroImageBottomTemplate;
