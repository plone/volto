import React from 'react';
import {
  HeroImage,
  HeroText,
  HeroToolbar,
} from '@plone/volto/components/manage/Blocks/HeroImageLeft/components';

const HeroImageLeftTemplate = (props) => (
  <>
    <HeroToolbar {...props} className="toolbar-left" />
    <HeroImage {...props} />
    <HeroText {...props} />
  </>
);

export default HeroImageLeftTemplate;
