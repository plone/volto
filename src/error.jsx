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
const Error = ({ message }) => (
  <div>
    <span>Something went wrong:&nbsp;</span>
    <span>{message}</span>
  </div>
);

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
