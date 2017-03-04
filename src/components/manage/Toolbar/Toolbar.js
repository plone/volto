/**
 * Toolbar component.
 * @module components/manage/Toolbar/Toolbar
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
 * Toolbar container class.
 * @class Toolbar
 * @extends Component
 */
export default class Toolbar extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    path: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    token: PropTypes.string,
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      this.props.token &&
        <div id="edit-zone" role="toolbar" className="pat-toolbar initialized">
          <div className="plone-toolbar-container">
            <nav>
              <ul className="plone-toolbar-main" >
                <li className={this.props.selected === 'view' ? 'active' : ''}>
                  <Link to={this.props.path}>
                    <span aria-hidden="true" className="icon-view" />
                    <span>View</span>
                  </Link>
                </li>
                <li className={this.props.selected === 'edit' ? 'active' : ''}>
                  <Link to={`${this.props.path}/edit`}>
                    <span aria-hidden="true" className="icon-edit" />
                    <span>Edit</span>
                  </Link>
                </li>
                <li className={this.props.selected === 'add' ? 'active' : ''}>
                  <Link to={`${this.props.path}/add`}>
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
        </div>
    );
  }
}
