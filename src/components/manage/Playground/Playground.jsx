import React from 'react';
import { Display, Workflow } from '@plone/volto/components';

const Playground = () => {
  return (
    <div style={{ margin: '0 auto', width: '300px' }}>
      <Display pathname="/playground" />

      <div style={{ marginTop: '100px' }}>
        <Workflow pathname="/playground" />
      </div>
    </div>
  );
};

export default Playground;
