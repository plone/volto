import React from 'react';
import TeaserBody from './Body';
import { withBlockExtensions } from '@plone/volto/helpers';

const TeaserView = (props) => {
  return <TeaserBody {...props} />;
};

export default withBlockExtensions(TeaserView);
