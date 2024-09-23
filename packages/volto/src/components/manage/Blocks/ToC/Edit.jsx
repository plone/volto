import React from 'react';

import { SidebarPortal } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

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
    blocksErrors,
  } = props;
  const schema = TableOfContentsSchema(props);

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
