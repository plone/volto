/**
 * Logo component.
 * @module components/Logo
 */

import React from 'react';

import LogoImage from './Logo.png';

/**
 * Logo component class.
 * @function Logo
 * @returns {string} Markup of the component.
 */
const Logo = () => (
  <a id="portal-logo" title="Site" href="">
    <img src={LogoImage} alt="Plone site" title="Plone site" />
  </a>
);

export default Logo;
