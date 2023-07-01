import React, { Component } from 'react';

import { SidebarPortal } from '@plone/volto/components';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';

import TableOfContentsSchema from './Schema';
import View from './View';

class Edit extends Component {
  render() {
    const schema = TableOfContentsSchema(this.props);

    return (
      <>
        <View {...this.props} mode="edit" />

        <SidebarPortal selected={this.props.selected}>
          <BlockDataForm
            schema={schema}
            title={schema.title}
            onChangeField={(id, value) => {
              this.props.onChangeBlock(this.props.block, {
                ...this.props.data,
                [id]: value,
              });
            }}
            onChangeBlock={this.props.onChangeBlock}
            formData={this.props.data}
            block={this.props.block}
          />
        </SidebarPortal>
      </>
    );
  }
}

export default Edit;
