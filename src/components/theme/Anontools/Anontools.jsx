/**
 * Anontools component.
 * @module components/theme/Anontools/Anontools
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { List } from 'semantic-ui-react';

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
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  }

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
