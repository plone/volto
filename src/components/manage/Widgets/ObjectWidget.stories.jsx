import React from 'react';
import { searchResults } from './ObjectBrowserWidget.stories';
import ObjectWidget from './ObjectWidget';
import WidgetStory from './story';

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

export const Default = WidgetStory.bind({
  props: { id: 'objectwidget', title: 'Slides' },
  widget: ObjectWidget,
  customStore,
});
Default.args = {
  schema: defaultSchema,
};

export const MultipleFieldsets = WidgetStory.bind({
  props: { id: 'objectwidget', title: 'Slides' },
  widget: ObjectWidget,
  customStore,
});
MultipleFieldsets.args = {
  schema: multipleFieldsets,
};

export default {
  title: 'Widgets/Object (JSON)',
  component: ObjectWidget,
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
