import React from 'react';
import TeaserBody from './Body';
import { SidebarPortal } from '@plone/volto/components';
import TeaserData from './Data';
import { withBlockExtensions } from '@plone/volto/helpers';

const TeaserEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;

  return (
    <>
      <TeaserBody {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <TeaserData
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(TeaserEdit);
