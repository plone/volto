/**
 * Anontools component.
 * @module components/theme/Anontools/Anontools
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List } from 'semantic-ui-react';

/**
 * Anontools container class.
 * @class Anontools
 * @extends Component
 */
@connect(state => ({
  token: state.userSession.token,
}))
export default class Anontools extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      !this.props.token &&
      <List floated="right" horizontal>
        <Link className="item" to="/login">Log in</Link>
      </List>
    );
  }
}
