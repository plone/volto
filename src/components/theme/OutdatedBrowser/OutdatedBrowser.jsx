import React from 'react';
import { Message, Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { settings } from '~/config';

const OutdatedBrowser = () => {
  const browserdetect = useSelector(state => state.browserdetect);
  return (
    settings.notSupportedBrowsers.includes(browserdetect.name) && (
      <Container style={{ marginBottom: '20px' }}>
        <Message negative>
          <Message.Header>You are using an outdated browser</Message.Header>
          <p>
            You are using {`${browserdetect.name} ${browserdetect.version}`}{' '}
            which is deprecated by its vendor. That means that it does not get
            security updates and it is not ready for current modern web
            features, which deteriorates the user experience. Please upgrade to
            a modern browser.
          </p>
        </Message>
      </Container>
    )
  );
};

export default OutdatedBrowser;
