import React, { Component } from 'react';

import { SidebarPortal } from '@plone/volto/components';
import { Form, BlockDataForm } from '@plone/volto/components/manage/Form';

import FormSchema from './schema';

class Edit extends Component {
  render() {
    const schema = FormSchema(this.props);

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
              },
            },
            required: [],
            title: 'Form',
            type: 'object',
          }}
          formData={{
            schema: {
              fieldsets: [
                {
                  behavior: 'plone',
                  fields: ['name', 'from', 'subject', 'message'],
                  id: 'default',
                  title: 'Default',
                },
              ],
              properties: {
                name: {
                  description: 'Please enter your full name',
                  factory: 'Text',
                  title: 'Name',
                  type: 'string',
                  widget: 'text',
                },
                from: {
                  description: 'Please enter your e-mail address',
                  factory: 'Text',
                  title: 'From',
                  type: 'string',
                  widget: 'text',
                },
                subject: {
                  description: '',
                  factory: 'Text',
                  title: 'Subject',
                  type: 'string',
                  widget: 'text',
                },
                message: {
                  description: 'Please enter the message you want to send',
                  factory: 'Text',
                  title: 'Message',
                  type: 'string',
                  widget: 'text',
                },
              },
              required: [],
              title: 'Form',
              type: 'object',
            },
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

export default Edit;
