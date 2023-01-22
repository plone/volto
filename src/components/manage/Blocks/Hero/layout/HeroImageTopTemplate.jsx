import React from 'react';
import {
  HeroImage,
  HeroText,
} from '@plone/volto/components/manage/Blocks/Hero/components';

const HeroImageTopTemplate = (props) => (
  <div className="block-inner-wrapper flex-column">
    <HeroImage {...props} />
    <HeroText {...props} />
  </div>
);

export default HeroImageTopTemplate;
