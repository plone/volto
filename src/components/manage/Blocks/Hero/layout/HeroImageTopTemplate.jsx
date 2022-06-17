import React from 'react';
import {
  HeroImage,
  HeroText,
  HeroToolbar,
} from '@plone/volto/components/manage/Blocks/Hero/components';

const HeroImageTopTemplate = (props) => (
  <div className="block-inner-wrapper flex-column">
    <HeroToolbar {...props} className="toolbar-middle" />
    <HeroImage {...props} />
    <HeroText {...props} />
  </div>
);

export default HeroImageTopTemplate;
