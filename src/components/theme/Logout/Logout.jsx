/**
 * Login container.
 * @module components/theme/Logout/Logout
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';

import { Login } from '@plone/volto/components';
import { logout, purgeMessages } from '@plone/volto/actions';

/**
 * Logout class.
 * @class Logout
 * @extends Component
 */
class Logout extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    logout: PropTypes.func.isRequired,
    purgeMessages: PropTypes.func.isRequired,
    query: PropTypes.shape({
      return_url: PropTypes.string,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    query: null,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    this.props.logout();
    this.props.purgeMessages();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return <Login location={{ query: this.props.location.query }} />;
  }
}

export default connect(
  (state, props) => ({
    query: qs.parse(props.location.search),
  }),
  { logout, purgeMessages },
)(Logout);
