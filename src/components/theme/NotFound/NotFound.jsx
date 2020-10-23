/**
 * Home container.
 * @module components/theme/NotFound/NotFound
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

global.__SERVER__ = false; // eslint-disable-line no-underscore-dangle

/**
 * Not found function.
 * @function NotFound
 * @returns {string} Markup of the not found page.
 */
const NotFound = (props) => {
  if (__SERVER__ && props.serverStaticContext) {
    const { serverStaticContext } = props;
    serverStaticContext.is404 = true;
    serverStaticContext.error = props.error;
  }
  return (
    <Container className="view-wrapper">
      <h1>
        <FormattedMessage
          id="This page does not seem to exist…"
          defaultMessage="This page does not seem to exist…"
        />
      </h1>
      <p className="description">
        <FormattedMessage
          id="We apologize for the inconvenience, but the page you were trying to access is not at this address. You can use the links below to help you find what you are looking for."
          defaultMessage="We apologize for the inconvenience, but the page you were trying to access is not at this address. You can use the links below to help you find what you are looking for."
        />
      </p>
      <p>
        <FormattedMessage
          id="If you are certain you have the correct web address but are encountering an error, please contact the {site_admin}."
          defaultMessage="If you are certain you have the correct web address but are encountering an error, please contact the {site_admin}."
          values={{
            site_admin: (
              <Link to="/contact-form">
                <FormattedMessage
                  id="Site Administration"
                  defaultMessage="Site Administration"
                />
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage id="Thank you." defaultMessage="Thank you." />
      </p>
    </Container>
  );
};

export default NotFound;
