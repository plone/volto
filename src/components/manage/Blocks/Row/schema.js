import { defineMessages } from 'react-intl';

const messages = defineMessages({
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  row: {
    id: 'Row',
    defaultMessage: 'Row',
  },
});

export const GridSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.row),
    block: 'row',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['headline'],
      },
    ],

    properties: {
      headline: {
        title: intl.formatMessage(messages.headline),
      },
    },
    required: [],
  };
};
