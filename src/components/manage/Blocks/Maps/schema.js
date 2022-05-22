import { defineMessages } from 'react-intl';

const messages = defineMessages({
  MapsURL: {
    id: 'Maps URL',
    defaultMessage: 'Maps URL',
  },
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});

export function MapsSchema({ formData, intl }) {
  return {
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [...(formData.url ? ['url', 'align'] : [])],
      },
    ],

    properties: {
      url: {
        title: intl.formatMessage(messages.MapsURL),
        widget: 'url',
      },

      align: {
        title: intl.formatMessage(messages.Align),
        widget: 'align',
      },
    },
    required: [],
  };
}
