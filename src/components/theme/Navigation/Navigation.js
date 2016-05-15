/**
 * Navigation component.
 * @module components/Navigation
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router'

/**
 * Navigation component class.
 * @function Navigation
 * @param {Object} props Component properties.
 * @param {string} props.path Object path.
 * @returns {string} Markup of the component.
 */
const Navigation = ({ path }) => (
  <div id="mainnavigation-wrapper">
    <div id="mainnavigation">
      <nav className="plone-navbar" id="portal-globalnav-wrapper" role="navigation">
        <div className="container">
          <div className="plone-collapse plone-navbar-collapse" id="portal-globalnav-collapse">
            <ul className="plone-nav plone-navbar-nav" id="portal-globalnav">
              <li id="portaltab-index_html" className={path === '/home' ? 'selected': ''}>
                <Link to="/home">Home</Link>
              </li>
              <li id="portaltab-index_html" className={path === '/about' ? 'selected': ''}>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Navigation.propTypes = {
  path: PropTypes.string,
};

export default Navigation;
