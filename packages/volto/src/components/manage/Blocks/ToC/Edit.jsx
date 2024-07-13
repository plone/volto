import React from 'react';

import { SidebarPortal } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

import TableOfContentsSchema from './Schema';
import View from './View';

const Edit = (props) => {
  const schema = TableOfContentsSchema(props);
  const handleChangeField = (id, value) => {
    props.onChangeBlock(props.block, {
      ...props.data,
      [id]: value,
    });
  };
  return (
    <>
      <View {...props} mode="edit" />

      <SidebarPortal selected={this.props.selected}>
        <BlockDataForm
          schema={schema}
          title={schema.title}
          onChangeField={handleChangeField}
          onChangeBlock={props.onChangeBlock}
          formData={props.data}
          block={props.block}
          navRoot={props.navRoot}
          contentType={props.contentType}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
