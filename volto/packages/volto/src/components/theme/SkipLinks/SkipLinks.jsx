import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { Pluggable } from '@plone/volto/components/manage/Pluggable';

const messages = defineMessages({
  mainView: {
    id: 'skiplink-main-content',
    defaultMessage: 'Skip to main content',
  },
  navigation: {
    id: 'skiplink-navigation',
    defaultMessage: 'Skip to navigation',
  },
  footer: {
    id: 'skiplink-footer',
    defaultMessage: 'Skip to footer',
  },
});

const SkipLinks = () => {
  const intl = useIntl();

  return (
    <div
      className="skiplinks-wrapper"
      role="complementary"
      aria-label="Skiplinks"
    >
      <a className="skiplink" href="#view">
        {intl.formatMessage(messages.mainView)}
      </a>
      <a className="skiplink" href="#navigation">
        {intl.formatMessage(messages.navigation)}
      </a>
      <a className="skiplink" href="#footer">
        {intl.formatMessage(messages.footer)}
      </a>
      <Pluggable name="main.skiplinks" />
    </div>
  );
};

export default SkipLinks;
