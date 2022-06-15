import { defineMessages } from 'react-intl';

const messages = defineMessages({
  more: {
    id: 'Link more',
    defaultMessage: 'Link more',
  },
  LinkTitle: {
    id: 'Link title',
    defaultMessage: 'Link Title',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  Opacity: {
    id: 'Opacity',
    defaultMessage: 'Opacity',
  },
});

const schemaHero = ({ intl, variation }) => {
  return {
    title: 'Block settings',
    required: [],
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.more),
        fields: [
          'linkTitle',
          'linkHref',
          ...(variation?.id === 'heroImageBackground'
            ? ['align', 'opacity']
            : []),
        ],
      },
    ],
    properties: {
      linkTitle: {
        title: intl.formatMessage(messages.LinkTitle),
      },
      linkHref: {
        title: intl.formatMessage(messages.LinkTo),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description'],
        allowExternals: true,
      },
      align: {
        title: intl.formatMessage(messages.Align),
        widget: 'align',
      },
      opacity: {
        title: intl.formatMessage(messages.Opacity),
        type: 'number',
        minimum: 0.1,
        maximum: 1,
        defaultValue: 1,
        step: 0.1,
      },
    },
  };
};
export default schemaHero;
