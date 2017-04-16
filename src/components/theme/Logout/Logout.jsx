/**
 * Login container.
 * @module components/theme/Logout/Logout
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-connect';

import { Login } from '../../../components';
import { logout } from '../../../actions';

/**
 * LogoutComponent class.
 * @class LogoutComponent
 * @extends Component
 */
@connect(() => ({}), dispatch => bindActionCreators({ logout }, dispatch))
export class LogoutComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

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

export default asyncConnect([
  {
    key: 'userSession',
    promise: ({ store: { dispatch } }) => dispatch(logout()),
  },
])(LogoutComponent);
