import React from 'react';
import TeaserBody from './Body';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

const TeaserView = (props) => {
  return <TeaserBody {...props} />;
};

export default withBlockExtensions(TeaserView);
