/**
 * Home container.
 * @module components/theme/NotFound/NotFound
 */

import React from 'react';

/**
 * Not found function.
 * @function NotFound
 * @returns {string} Markup of the not found page.
 */
const NotFound = () => (
  <div id="page-not-found">
    <h1>Doh! 404!</h1>
    <p>These are <em>not</em> the droids you are looking for!</p>
  </div>
);

export default NotFound;
