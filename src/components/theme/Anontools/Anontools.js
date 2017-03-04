/**
 * Anontools component.
 * @module components/theme/Anontools/Anontools
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

@connect(
  state => ({
    token: state.userSession.token,
  }),
)
/**
 * Anontools container class.
 * @class Anontools
 * @extends Component
 */
export default class Anontools extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      !this.props.token &&
        <div id="portal-anontools">
          <ul>
            <li>
              <Link to="/login" id="personaltools-login">Log in</Link>
            </li>
          </ul>
        </div>
    );
  }
}
