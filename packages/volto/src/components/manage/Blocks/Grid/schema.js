import { defineMessages } from 'react-intl';

const messages = defineMessages({
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  grid: {
    id: 'Grid',
    defaultMessage: 'Grid',
  },
});

export const GridBlockSchema = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.grid),
    block: 'grid',
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
