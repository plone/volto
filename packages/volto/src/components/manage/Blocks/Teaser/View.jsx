import React from 'react';
import TeaserBody from './Body';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

const TeaserView = (props) => {
  return (
    <TeaserBody
      {...props}
      loading={props.isLCPBlock ? 'eager' : 'lazy'}
      fetchpriority={props.isLCPBlock ? 'high' : 'low'}
    />
  );
};

export default withBlockExtensions(TeaserView);
