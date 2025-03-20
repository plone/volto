/**
 * Home container.
 * @module components/theme/ConnectionRefused/ConnectionRefused
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { addPrefixPath } from '@plone/volto/helpers/Url/Url';

const ConnectionRefused = () => (
  <Container
    className="view-wrapper"
    style={{
      fontFamily: 'Helvetica, sans-serif',
      fontSize: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1 style={{ textAlign: 'center', lineHeight: '40px' }}>
      <FormattedMessage
        id="Connection refused"
        defaultMessage="Connection refused"
      />
      {__DEVELOPMENT__ && (
        <>
          <br />
          <UniversalLink href={config.settings.apiPath} forceA>
            {addPrefixPath(config.settings.apiPath)}
          </UniversalLink>
        </>
      )}
    </h1>
    {__DEVELOPMENT__ && (
      <p
        className="description"
        style={{
          textAlign: 'center',
          margin: '20px auto',
          width: '475px',
        }}
      >
        <FormattedMessage
          id="The backend is not responding, please check if you have started Plone, check your project's configuration object apiPath (or if you are using the internal proxy, devProxyToApiPath) or the RAZZLE_API_PATH Volto's environment variable."
          defaultMessage="The backend is not responding, please check if you have started Plone, check your project's configuration object apiPath (or if you are using the internal proxy, devProxyToApiPath) or the RAZZLE_API_PATH Volto's environment variable."
        />
      </p>
    )}
    {!__DEVELOPMENT__ && (
      <>
        <p
          className="description"
          style={{
            textAlign: 'center',
            margin: '20px auto',
            width: '475px',
          }}
        >
          <FormattedMessage
            id="We apologize for the inconvenience, but the backend of the site you are accessing is not available right now. Please, try again later."
            defaultMessage="We apologize for the inconvenience, but the backend of the site you are accessing is not available right now. Please, try again later."
          />
        </p>

        <p style={{ textAlign: 'center' }}>
          <FormattedMessage id="Thank you." defaultMessage="Thank you." />
        </p>
      </>
    )}
  </Container>
);

export default ConnectionRefused;
