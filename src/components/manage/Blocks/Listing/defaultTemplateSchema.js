import { defineMessages } from 'react-intl';

const messages = defineMessages({
  titleField: {
    id: 'Title field',
    defaultMessage: 'Title field',
  },
  descriptionField: {
    id: 'Description field',
    defaultMessage: 'Description field',
  },
});
export default (props) => {
  const { intl } = props;
  return {
    fieldsets: [
      {
        id: 'variation',
        title: 'Variation',
        fields: ['variationTitle', 'variationDescription'],
      },
    ],
    properties: {
      variationTitle: {
        title: intl.formatMessage(messages.titleField),
      },
      variationDescription: {
        title: intl.formatMessage(messages.descriptionField),
      },
    },
    required: [],
  };
};
