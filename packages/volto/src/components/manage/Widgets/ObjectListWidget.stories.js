import ObjectListWidgetDefault from './ObjectListWidget';
import { RealStoreWrapper, FormUndoWrapper } from '@plone/volto/storybook';
import React from 'react';
import { searchResults } from './ObjectBrowserWidget.stories';

import { cloneDeep } from 'lodash';

const defaultSchema = {
  title: 'Item',
  addMessage: 'Add item',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['href', 'title', 'description', 'preview_image'],
    },
  ],

  properties: {
    href: {
      title: 'Source',
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: [
        'Title',
        'Description',
        'hasPreviewImage',
        'headtitle',
      ],
      allowExternals: true,
    },
    title: {
      title: 'Title',
    },
    description: {
      title: 'Description',
    },
    preview_image: {
      title: 'Preview image',
      widget: 'object_browser',
      mode: 'image',
      allowExternals: true,
    },
  },
  required: [],
};

const multiFieldsetSchema = {
  title: 'Item',
  addMessage: 'Add item',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['href', 'title', 'description'],
    },
    {
      id: 'preview',
      title: 'Preview',
      fields: ['preview_image'],
    },
  ],

  properties: {
    href: {
      title: 'Source',
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: [
        'Title',
        'Description',
        'hasPreviewImage',
        'headtitle',
      ],
      allowExternals: true,
    },
    title: {
      title: 'Title',
    },
    description: {
      title: 'Description',
    },
    preview_image: {
      title: 'Preview image',
      widget: 'object_browser',
      mode: 'image',
      allowExternals: true,
    },
  },
  required: [],
};

const customStore = {
  search: {
    subrequests: {
      'testBlock-link': searchResults,
      'testBlock-image': searchResults,
    },
  },
  userSession: { token: '1234' },
  intl: {
    locale: 'en',
    messages: {},
  },
};

const ObjectListWidgetComponent = ({
  children,
  secondarySchema,
  schemaExtender,
  ...args
}) => {
  return (
    <RealStoreWrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <FormUndoWrapper initialState={{ value: undefined }} showControls={true}>
        {({ state, onChange }) => (
          <div className="ui segment form attached" style={{ width: '400px' }}>
            {children}
            <ObjectListWidgetDefault
              {...args}
              id="SliderItem"
              title="Slider Item"
              block="testBlock"
              value={state.value}
              onChange={(block, value) => onChange({ value })}
              schemaExtender={schemaExtender}
            />
            <hr />
            <pre>Value: {JSON.stringify(state.value, null, 4)}</pre>
          </div>
        )}
      </FormUndoWrapper>
    </RealStoreWrapper>
  );
};

export const Default = ObjectListWidgetComponent.bind({});
Default.args = {
  schema: defaultSchema,
};

export const MultipleFieldsets = ObjectListWidgetComponent.bind({});
MultipleFieldsets.args = {
  schema: multiFieldsetSchema,
};

const addDefaultValues = (schema) => {
  schema = cloneDeep(schema);
  schema.properties.title.default = 'Plone release announcement';
  schema.properties.description.default =
    'Soon to arrive on your local machine';
  return schema;
};

export const DefaultValues = ObjectListWidgetComponent.bind({});
DefaultValues.args = {
  schema: addDefaultValues(multiFieldsetSchema),
};

const defaultSecondarySchema = {
  title: 'Additional fields',
  fieldsets: [
    {
      id: 'Default',
      title: 'Default',
      fields: ['size'],
    },
  ],
  properties: {
    size: {
      title: 'Image size',
    },
  },
  required: [],
};

export const SchemaExtender = (args) => {
  const { secondarySchema } = args;
  const schemaExtender = (schema, data, intl) => {
    const finalSchema =
      data?.href?.[0]?.['@id'] === '/image'
        ? {
            ...schema,
            fieldsets: [
              {
                ...schema.fieldsets[0],
                fields: [
                  ...schema.fieldsets[0].fields,
                  ...secondarySchema.fieldsets[0].fields,
                ],
              },
              ...schema.fieldsets.slice(1),
              ...secondarySchema.fieldsets.slice(1),
            ],
            properties: {
              ...schema.properties,
              ...secondarySchema.properties,
            },
          }
        : schema;
    return finalSchema;
  };
  return (
    <ObjectListWidgetComponent schemaExtender={schemaExtender} {...args}>
      <>
        Notice the form changes if you pick "I am an image" for the{' '}
        <em>source</em> field. We're achieving that by passing a custom{' '}
        <em>schemaExtender</em> that combines the fields of the{' '}
        <em>secondarySchema</em> storybook control.
      </>
    </ObjectListWidgetComponent>
  );
};
SchemaExtender.args = {
  schema: defaultSchema,
  secondarySchema: defaultSecondarySchema,
};

export default {
  title: 'Edit Widgets/Object List (JSON)',
  component: ObjectListWidgetDefault,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <h4>A DataGridField-like for lists of JSON objects</h4>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    schema: {},
  },
};
