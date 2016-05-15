/**
 * Toolbar component.
 * @module components/Toolbar
 */

import React from 'react';

/**
 * Toolbar component class.
 * @function Toolbar
 * @returns {string} Markup of the component.
 */
const Toolbar = () =>
  <div id="edit-zone" role="toolbar" className="pat-toolbar initialized">
    <div className="plone-toolbar-container">
      <nav>
        <ul className="plone-toolbar-main" >
          <li>
            <a href="/view">
              <span aria-hidden="true" className="icon-view" />
              <span>View</span>
            </a>
          </li>
          <li>
            <a href="/edit">
              <span aria-hidden="true" className="icon-edit" />
              <span>Edit</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>;

export default Toolbar;
