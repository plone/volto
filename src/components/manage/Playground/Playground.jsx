import React from 'react';
import { Display } from '@plone/volto/components';

const Playground = () => {
  return (
    <div style={{ margin: '0 auto', width: '300px' }}>
      <Display pathname="/playground" />
    </div>
  );
};

export default Playground;
