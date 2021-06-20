import ObjectListWidgetDefault from './ObjectListWidget';
import Wrapper from '@plone/volto/storybook';
import React from 'react';
import { searchResults } from './ObjectBrowserWidget.stories';

const itemSchema = (props) => {
  return {
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

const ObjectListWidgetComponent = (args) => {
  const [value, setValue] = React.useState([]);
  const onChange = (block, value) => setValue(value);

  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <ObjectListWidgetDefault
          {...args}
          id="SliderItem"
          title="Slider Item"
          block="testBlock"
          value={value}
          onChange={onChange}
          schema={itemSchema}
        />
        <pre>{JSON.stringify(value, null, 4)}</pre>
      </div>
    </Wrapper>
  );
};

export default {
  title: 'Widgets/Object List Widget',
  component: ObjectListWidgetDefault,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  // subcomponents: { ArgsTable },
};

export const ObjectListWidget = () => <ObjectListWidgetComponent />;
