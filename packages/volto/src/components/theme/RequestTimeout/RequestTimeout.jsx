/**
 * RequestTimeout.
 * @module components/theme/RequestTimeout/RequestTimeout
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { addPrefixPath } from '@plone/volto/helpers/Url/Url';

/**
 * @function RequestTimeout
 * @returns {string} Markup of the not found page.
 */
const RequestTimeout = () => (
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
    {__DEVELOPMENT__ && (
      <>
        <h1 style={{ textAlign: 'center', lineHeight: '40px' }}>
          <FormattedMessage
            id="No connection to the server"
            defaultMessage="There is no connection to the server, due to a timeout o no network connection."
          />
          <br />
          <UniversalLink href={config.settings.apiPath} forceA>
            {addPrefixPath(config.settings.apiPath)}
          </UniversalLink>
        </h1>
        <p
          className="description"
          style={{
            textAlign: 'center',
            margin: '20px auto',
            width: '475px',
          }}
        >
          <FormattedMessage
            id="The backend is not responding, due to a server timeout or a connection problem of your device. Please check your connection and try again."
            defaultMessage="The backend is not responding, due to a server timeout or a connection problem of your device. Please check your connection and try again."
          />
        </p>
      </>
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
            id="The backend is not responding, due to a server timeout or a connection problem of your device. Please check your connection and try again."
            defaultMessage="The backend is not responding, due to a server timeout or a connection problem of your device. Please check your connection and try again."
          />
        </p>

        <p style={{ textAlign: 'center' }}>
          <FormattedMessage id="Thank you." defaultMessage="Thank you." />
        </p>
      </>
    )}
  </Container>
);

export default RequestTimeout;
