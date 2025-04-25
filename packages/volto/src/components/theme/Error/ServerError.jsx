/**
 * @module components/theme/Error/ServerError
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';

/**
 * server error
 * @function ServerError
 * @returns {string} Markup of the server error page.
 */
const ServerError = () => (
  <Container className="view-wrapper">
    <h1>
      <FormattedMessage id="Server Error" defaultMessage="Server Error" />
    </h1>
    <p className="description">
      <FormattedMessage
        id="We apologize for the inconvenience, but there was an unexpected error on the server."
        defaultMessage="We apologize for the inconvenience, but there was an unexpected error on the server."
      />
    </p>
  </Container>
);

export default withServerErrorCode(500)(ServerError);
