/**
 * Home container.
 * @module components/theme/CorsError/CorsError
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from 'semantic-ui-react';

import { settings } from '~/config';

/**
 * Not found function.
 * @function CorsError
 * @returns {string} Markup of the not found page.
 */
const CorsError = () => (
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
            id="There is a configuration problem on the backend"
            defaultMessage="There is a configuration problem on the backend"
          />
          <br />
          <a href={settings.apiPath}>{settings.apiPath}</a>
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
            id="The backend is responding, but the CORS headers are not configured properly and the browser has denied the access to the backend resources."
            defaultMessage="The backend is responding, but the CORS headers are not configured properly and the browser has denied the access to the backend resources."
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
            id="The backend server of your website is not anwering, we apologize for the inconvenience. Please try to re-load the page and try again. If the problem persists please contact the site administrators."
            defaultMessage="The backend server of your website is not anwering, we apologize for the inconvenience. Please try to re-load the page and try again. If the problem persists please contact the site administrators."
          />
        </p>

        <p style={{ textAlign: 'center' }}>
          <FormattedMessage id="Thank you." defaultMessage="Thank you." />
        </p>
      </>
    )}
  </Container>
);

export default CorsError;
