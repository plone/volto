/**
 * Toolbar component.
 * @module components/Toolbar
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * Toolbar component class.
 * @function Toolbar
 * @param {Object} props Component properties.
 * @param {string} props.path Path.
 * @param {string} props.selected Selected item.
 * @returns {string} Markup of the component.
 */
const Toolbar = ({ path, selected }) =>
  localStorage.getItem('auth_token') &&
    <div id="edit-zone" role="toolbar" className="pat-toolbar initialized">
      <div className="plone-toolbar-container">
        <nav>
          <ul className="plone-toolbar-main" >
            <li className={selected === 'view' ? 'active' : ''}>
              <Link to={path}>
                <span aria-hidden="true" className="icon-view" />
                <span>View</span>
              </Link>
            </li>
            <li className={selected === 'edit' ? 'active' : ''}>
              <Link to={`${path}/edit`}>
                <span aria-hidden="true" className="icon-edit" />
                <span>Edit</span>
              </Link>
            </li>
            <li className={selected === 'add' ? 'active' : ''}>
              <Link to={`${path}/add`}>
                <span aria-hidden="true" className="icon-add" />
                <span>Add</span>
              </Link>
            </li>
          </ul>
          <ul id="personal-bar-container">
            <li>
              <Link to="/logout">
                <span aria-hidden="true" className="icon-user" />
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Toolbar.propTypes = {
  path: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
};

export default Toolbar;
