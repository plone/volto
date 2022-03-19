import React from 'react';
import TeaserBody from './Body';
import { withBlockExtensions } from '@plone/volto/helpers';

const TeaserBlockView = (props) => {
  return <TeaserBody {...props} />;
};

export default withBlockExtensions(TeaserBlockView);
