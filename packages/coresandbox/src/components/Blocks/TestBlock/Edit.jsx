import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import Data from './Data';

const TestBlockEdit = (props) => {
  const { selected } = props;

  return (
    <>
      <div>Test Block Edit</div>
      <SidebarPortal selected={selected}>
        <Data {...props} />
      </SidebarPortal>
    </>
  );
};

export default TestBlockEdit;
