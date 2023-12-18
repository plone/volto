import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
});

const ContentsBreadcrumbsHomeItem = () => {
  const intl = useIntl();

  return <>{intl.formatMessage(messages.home)}</>;
};

export default ContentsBreadcrumbsHomeItem;
