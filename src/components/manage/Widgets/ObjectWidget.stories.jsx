import React from 'react';
import { searchResults } from './ObjectBrowserWidget.stories';
import ObjectWidgetDefault from './ObjectWidget';
import Wrapper from '@plone/volto/storybook';

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

const multipleFieldsets = {
  title: 'Item',
  addMessage: 'Add item',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['href', 'title', 'description', 'preview_image'],
    },
    {
      id: 'second',
      title: 'Secondary',
      fields: ['contributors'],
    },
  ],

  properties: {
    contributors: {
      title: 'Contributors',
      description: 'Example field with contributors information',
      wiget: 'textarea',
    },
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

const ObjectWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState();
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <ObjectWidgetDefault
          {...args}
          id="SliderItem"
          title="Slider Item"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
        <pre>Value: {JSON.stringify(value, null, 4)}</pre>
      </div>
    </Wrapper>
  );
};

export const Default = ObjectWidgetComponent.bind({});
Default.args = {
  schema: defaultSchema,
};

export const MultipleFieldsets = ObjectWidgetComponent.bind({});
MultipleFieldsets.args = {
  schema: multipleFieldsets,
};

export default {
  title: 'Widgets/Object (JSON)',
  component: ObjectWidgetDefault,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <h4>Schema-based editing of JSON values</h4>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    schema: {},
  },
};
