import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import Data from './Data';

const TestBlockEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;

  return (
    <>
      <div>Test Block Edit</div>
      <SidebarPortal selected={selected}>
        <Data
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default TestBlockEdit;
