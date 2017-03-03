/**
 * Anontools component.
 * @module components/Anontools
 */

import React from 'react';
import { Link } from 'react-router';

/**
 * Anontools component class.
 * @function Anontools
 * @returns {string} Markup of the component.
 */
const Anontools = () => (
  !localStorage.getItem('auth_token') &&
    <div id="portal-anontools">
      <ul>
        <li>
          <Link to="/login" id="personaltools-login">Log in</Link>
        </li>
      </ul>
    </div>
);

export default Anontools;
