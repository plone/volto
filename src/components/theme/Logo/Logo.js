/**
 * Logo component.
 * @module components/Logo
 */

import React from 'react';
import { Link } from 'react-router';

import LogoImage from './Logo.png';

/**
 * Logo component class.
 * @function Logo
 * @returns {string} Markup of the component.
 */
const Logo = () => (
  <Link id="portal-logo" title="Site" to="/">
    <img src={LogoImage} alt="Plone site" title="Plone site" />
  </Link>
);

export default Logo;
