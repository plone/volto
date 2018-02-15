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
import { logout, purgeMessages } from '../../../actions';

@connect(
  () => ({}),
  dispatch => bindActionCreators({ logout, purgeMessages }, dispatch),
)
/**
 * LogoutComponent class.
 * @class LogoutComponent
 * @extends Component
 */
export class LogoutComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    logout: PropTypes.func.isRequired,
    purgeMessages: PropTypes.func.isRequired,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.logout();
    this.props.purgeMessages();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return <Login location={{ query: {} }} />;
  }
}

export default asyncConnect([
  {
    key: 'userSession',
    promise: ({ store: { dispatch } }) => dispatch(logout()),
  },
])(LogoutComponent);
