import React from 'react';
import {
  HeroImage,
  HeroText,
  HeroToolbar,
} from '@plone/volto/components/manage/Blocks/HeroImageLeft/components';

const HeroImageRightTemplate = (props) => (
  <>
    <HeroToolbar {...props} className="toolbar-right" />
    <HeroText {...props} />
    <HeroImage {...props} />
  </>
);

export default HeroImageRightTemplate;
