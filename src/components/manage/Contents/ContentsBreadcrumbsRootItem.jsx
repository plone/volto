import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  root: {
    id: 'Root',
    defaultMessage: 'Root',
  },
});

const ContentsBreadcrumbsRootItem = () => {
  const intl = useIntl();

  return <>{intl.formatMessage(messages.root)}</>;
};

export default ContentsBreadcrumbsRootItem;
