/**
 * Navigation component.
 * @module components/Navigation
 */

import React from 'react';
import { Link } from 'react-router'

/**
 * Navigation component class.
 * @function Navigation
 * @returns {string} Markup of the component.
 */
const Navigation = () => (
  <div id="mainnavigation-wrapper">
    <div id="mainnavigation">
      <nav className="plone-navbar" id="portal-globalnav-wrapper" role="navigation">
        <div className="container">
          <div className="plone-collapse plone-navbar-collapse" id="portal-globalnav-collapse">
            <ul className="plone-nav plone-navbar-nav" id="portal-globalnav">
              <li id="portaltab-index_html" className="selected">
                <Link to="/home">Home</Link>
              </li>
              <li id="portaltab-news">
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
);

export default Navigation;
