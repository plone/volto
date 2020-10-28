/**
 * @module components/theme/Forbidden/Forbidden
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';

/**
 * forbidden function.
 * @function Forbidden
 * @returns {string} Markup of the forbidden page.
 */
const Forbidden = () => {
  return (
    <Container className="view-wrapper">
      <h1>
        <FormattedMessage id="Forbidden" defaultMessage="Forbidden" />
      </h1>
      <p className="description">
        <FormattedMessage
          id="We apologize for the inconvenience, but you don't have permissions on this resource."
          defaultMessage="We apologize for the inconvenience, but you don't have permissions on this resource."
        />
      </p>
    </Container>
  );
};

export default withServerErrorCode(403)(Forbidden);
