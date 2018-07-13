/**
 * Error Page.
 * @module Error
 */

import React from 'react';
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
    <h2>Sorry, something went wrong with your request&nbsp;</h2>
    <strong style={{ color: 'red' }}>{message}</strong>
    <pre>{stackTrace}</pre>
    <span style={{ textAlign: 'center' }}>
      <p>
        {/* eslint-disable-next-line */}
        <a href="javascript: history.back()">Navigate back</a>
      </p>
      <p>
        <a href="/">return to the site root</a>
      </p>
      <p>or try a different page.</p>
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

export default Error;
