import React from 'react';
import TeaserBody from './Body';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import TeaserData from './Data';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

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
