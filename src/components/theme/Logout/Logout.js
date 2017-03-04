/**
 * Login container.
 * @module components/theme/Logout/Logout
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Login } from '../../../components';
import { logout } from '../../../actions';

@connect(
  state => ({}),
  dispatch => bindActionCreators({ logout }, dispatch),
)
/**
 * Logout container class.
 * @class Logout
 * @extends Component
 */
export default class Logout extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    logout: PropTypes.func.isRequired,
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.logout();
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
