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
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});

const schemaHero = ({ intl }) => {
  return {
    title: intl.formatMessage(messages.blockTitle),
    required: [],
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.more),
        fields: ['align'],
      },
    ],
    properties: {
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
