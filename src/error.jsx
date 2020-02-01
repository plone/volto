/**
 * Error Page.
 * @module Error
 */

import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

/**
 * Error page.
 * @function Error
 * @returns {string} Markup of the error page.
 */
const Error = ({ message, stackTrace }) => (
  <div
    style={{
      fontFamily: __SERVER__ ? 'Helvetica, sans-serif' : null,
      fontSize: __SERVER__ ? '20px' : '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: __SERVER__ ? '100vh' : null,
    }}
  >
    {/* TODO: Replace inline styling with a CSS class, inline style only for __SERVER__ */}
    <h2>
      <FormattedMessage
        id="Sorry, something went wrong with your request"
        defaultMessage="Sorry, something went wrong with your request&nbsp;"
      />
    </h2>
    <strong style={{ color: 'red' }}>{message}</strong>
    <pre>{stackTrace}</pre>
    <span style={{ textAlign: 'center' }}>
      <p>
        {/* eslint-disable-next-line */}
        <a href="javascript: history.back()">
          <FormattedMessage id="Navigate back" defaultMessage="Navigate back" />
        </a>
      </p>
      <p>
        <a href="/">
          <FormattedMessage
            id="return to the site root"
            defaultMessage="return to the site root"
          />
        </a>
      </p>
      <p>
        <FormattedMessage
          id="or try a different page."
          defaultMessage="or try a different page."
        />
      </p>
    </span>
  </div>
);

Error.propTypes = {
  message: PropTypes.string.isRequired,
  stackTrace: PropTypes.string,
};

Error.defaultProps = {
  stackTrace: null,
};

export default injectIntl(Error);
