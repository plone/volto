import { defineMessages } from 'react-intl';

const messages = defineMessages({
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
});

export const GridSchema = (props) => {
  const { intl } = props;
  return {
    title: 'Grid',
    block: '__grid',
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
