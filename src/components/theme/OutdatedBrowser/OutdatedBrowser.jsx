import React from 'react';
import { Message, Container } from 'semantic-ui-react';
import { detect } from 'detect-browser';
import { settings } from '~/config';

const OutdatedBrowser = () => {
  const browser = detect();
  return (
    !__SERVER__ &&
    settings.notSupportedBrowsers.includes(browser.name) && (
      <Container style={{ marginBottom: '20px' }}>
        <Message>
          <Message.Header>You are using an outdated browser</Message.Header>
          <p>
            You are using {`${browser.name} ${browser.version}`} which is
            deprecated by its vendor. That means that it does not get security
            updates and it is not ready for current modern web features, which
            deteriorates the user experience. Please upgrade to a modern
            browser.
          </p>
        </Message>
      </Container>
    )
  );
};

export default OutdatedBrowser;
