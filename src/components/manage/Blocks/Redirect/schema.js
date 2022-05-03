import { defineMessages } from 'react-intl';

const messages = defineMessages({
  redirect: {
    id: 'Redirect Block',
    defaultMessage: 'Redirect Block',
  },
  remoteUrl: {
    id: 'Remote URL',
    defaultMessage: 'Remote URL',
  },
});

export const redirectBlockSchema = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.redirect),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['remoteUrl'],
      },
    ],
    properties: {
      remoteUrl: {
        title: intl.formatMessage(messages.remoteUrl),
        widget: 'object_browser',
        mode: 'link',
        llowExternals: true,
      },
    },
    required: [],
  };
};

export default redirectBlockSchema;
