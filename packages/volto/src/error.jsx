/**
 * Error Page.
 * @module Error
 */

import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

/**
 * Error page.
 * @function Error
 * @returns {string} Markup of the error page.
 */
const Error = ({ message, stackTrace }) => {
  let history = useHistory();

  return (
    <div
      style={{
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
          <button onClick={() => history.goBack()}>
            <FormattedMessage
              id="Navigate back"
              defaultMessage="Navigate back"
            />
          </button>
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
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  stackTrace: PropTypes.string,
};

Error.defaultProps = {
  stackTrace: null,
};

export default injectIntl(Error);
