/**
 * Login container.
 * @module components/
 */

import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { Login } from 'containers';

/**
 * Logout container class.
 * @class Logout
 * @extends Component
 */
export default class Logout extends Component {

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    localStorage.removeItem('auth_token');
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return <Login />;
  }
}
