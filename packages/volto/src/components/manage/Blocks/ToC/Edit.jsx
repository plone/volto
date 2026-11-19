import React from 'react';

import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import config from '@plone/volto/registry';

import TableOfContentsSchema from './Schema';
import View from './View';

const Edit = (props) => {
  const {
    onChangeBlock,
    data,
    block,
    selected,
    navRoot,
    contentType,
    blocksConfig = config.blocks.blocksConfig,
    blocksErrors,
  } = props;
  const blockSchema =
    blocksConfig?.[data['@type']]?.blockSchema ?? TableOfContentsSchema;
  const schema =
    typeof blockSchema === 'function' ? blockSchema(props) : blockSchema;

  return (
    <>
      <View {...props} mode="edit" />

      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
          block={block}
          navRoot={navRoot}
          contentType={contentType}
          errors={blocksErrors}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
