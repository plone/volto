import ObjectListWidgetDefault from './ObjectListWidget';
import Wrapper from '@plone/volto/storybook';
import React from 'react';
import { searchResults } from './ObjectBrowserWidget.stories';

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
  enableSchemaExtender,
  ...args
}) => {
  const [value, setValue] = React.useState([]);
  const onChange = (block, value) => setValue(value);

  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <div className="ui segment form attached" style={{ width: '400px' }}>
        {children}
        <ObjectListWidgetDefault
          {...args}
          id="SliderItem"
          title="Slider Item"
          block="testBlock"
          value={value}
          onChange={onChange}
          schemaExtender={
            enableSchemaExtender &&
            ((schema, data, intl) => {
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
            })
          }
        />
        <hr />
        <strong>Resulting value</strong>
        <pre>{JSON.stringify(value, null, 4)}</pre>
      </div>
    </Wrapper>
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
  return (
    <ObjectListWidgetComponent enableSchemaExtender={true} {...args}>
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
  title: 'Widgets/Object List (JSON)',
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
