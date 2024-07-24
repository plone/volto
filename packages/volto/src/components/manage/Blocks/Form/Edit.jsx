import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { SidebarPortal } from '@plone/volto/components';
import { Form, BlockDataForm } from '@plone/volto/components/manage/Form';
import { withBlockExtensions } from '@plone/volto/helpers';

import FormSchema from './schema';

class Edit extends Component {
  render() {
    const schema = FormSchema(this.props);
    const { data } = this.props;

    const defaultEmptyData = {
      fieldsets: [
        {
          id: 'default',
          title: 'Default',
          fields: [],
        },
      ],
      properties: {},
      required: [],
    };

    return (
      <>
        <Form
          schema={{
            fieldsets: [
              {
                behavior: 'plone',
                fields: ['schema'],
                id: 'default',
                title: 'Default',
              },
            ],
            properties: {
              schema: {
                description: '',
                factory: 'Text',
                title: 'Schema',
                type: 'string',
                widget: 'schema',
                default: defaultEmptyData,
              },
            },
            required: [],
            title: 'Form',
            type: 'object',
          }}
          formData={
            isEmpty(data.schema)
              ? { schema: defaultEmptyData }
              : { schema: data.schema }
          }
          onChangeFormData={(formData) => {
            this.props.onChangeBlock(this.props.block, {
              ...data,
              schema: formData.schema,
            });
          }}
          hideActions
        />

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
            navRoot={this.props.navRoot}
            contentType={this.props.contentType}
          />
        </SidebarPortal>
      </>
    );
  }
}

export default withBlockExtensions(Edit);
