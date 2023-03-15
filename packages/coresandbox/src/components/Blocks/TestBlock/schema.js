import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  Slider: {
    id: 'Slider',
    defaultMessage: 'Slider',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  imageOverride: {
    id: 'Image override',
    defaultMessage: 'Image override',
  },
  item: {
    id: 'Item',
    defaultMessage: 'Item',
  },
  items: {
    id: 'Items',
    defaultMessage: 'Items',
  },
  addItem: {
    id: 'Add item',
    defaultMessage: 'Add item',
  },
});

const itemSchema = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.item),
    addMessage: intl.formatMessage(messages.addItem),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'href',
          'title',
          'description',
          'preview_image',
          'extraDefault',
        ],
      },
    ],

    properties: {
      href: {
        title: intl.formatMessage(messages.Source),
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
        title: intl.formatMessage(messages.title),
      },
      description: {
        title: intl.formatMessage(messages.description),
      },
      preview_image: {
        title: intl.formatMessage(messages.imageOverride),
        widget: 'object_browser',
        mode: 'image',
        allowExternals: true,
      },
      extraDefault: {
        title: 'Extra',
        default: 'Extra default',
      },
    },
    required: [],
  };
};

export const SliderSchema = (props) => ({
  title: props.intl.formatMessage(messages.Slider),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'html',
        'slides',
        'fieldAfterObjectList',
        'href',
        'firstWithDefault',
        'style',
      ],
    },
  ],
  properties: {
    slides: {
      widget: 'object_list',
      title: props.intl.formatMessage(messages.items),
      schema: itemSchema,
    },
    fieldAfterObjectList: {
      title: 'Field after OL',
    },
    href: {
      title: props.intl.formatMessage(messages.Source),
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
    firstWithDefault: {
      title: 'Field with default',
      default: 'Some default value',
    },
    style: {
      widget: 'object',
      schema: {
        title: 'Style',
        fieldsets: [
          {
            id: 'default',
            fields: ['color'],
            title: 'Default',
          },
        ],
        properties: {
          color: {
            title: 'Color',
            default: 'red',
          },
        },
        required: [],
      },
    },
    html: {
      title: 'HTML',
      widget: 'richtext',
    },
  },
  required: [],
});
