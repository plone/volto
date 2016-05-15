/**
 * Breadcrumbs component.
 * @module components/Breadcrumbs
 */

import React from 'react';

/**
 * Breadcrumbs component class.
 * @function Breadcrumbs
 * @returns {string} Markup of the component.
 */
const Breadcrumbs = () => (
  <nav id="portal-breadcrumbs" className="plone-breadcrumb" role="navigation">
    <div className="container">
      <span id="breadcrumbs-you-are-here" className="hiddenStructure">You are here:</span>
      <ol aria-labelledby="breadcrumbs-you-are-here">
        <li id="breadcrumbs-home">
          <a href="/home">Home</a>
        </li>
      </ol>
    </div>
  </nav>
);

export default Breadcrumbs;
