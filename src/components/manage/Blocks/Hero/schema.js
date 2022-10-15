import { defineMessages } from 'react-intl';

const messages = defineMessages({
  more: {
    id: 'Link more',
    defaultMessage: 'Link more',
  },
  blockTitle: {
    id: 'Hero',
    defaultMessage: 'Hero',
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
});

const schemaHero = ({ intl, variation }) => {
  return {
    title: intl.formatMessage(messages.blockTitle),
    required: [],
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.more),
        fields: ['linkTitle', 'linkHref', 'align'],
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
        actions: ['left', 'right', 'center'],
        default: 'left',
      },
    },
  };
};
export default schemaHero;
