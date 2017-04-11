/**
 * Toolbar component.
 * @module components/manage/Toolbar/Toolbar
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon, Menu } from 'semantic-ui-react';

import { Actions, Types, Workflow } from '../../../components';

import logo from './plone-toolbarlogo.svg';

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
    pathname: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
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
      this.props.token &&
        <Menu inverted vertical fixed="left">
          <Menu.Item color="blue" active><img alt="Plone Toolbar" src={logo} /></Menu.Item>
          <Link to={`${this.props.pathname}/edit`} className={`item${this.props.selected === 'edit' ? ' active' : ''}`}>
            <span><Icon name="write" /> Edit</span>
          </Link>
          <Link to={this.props.pathname} className={`item${this.props.selected === 'view' ? ' active' : ''}`}>
            <span><Icon name="eye" /> View</span>
          </Link>
          <Types pathname={this.props.pathname} active={this.props.selected === 'add'} />
          <Workflow pathname={this.props.pathname} />
          <Actions pathname={this.props.pathname} />
          <Link to="/logout" className="item personal-bar">
            <span><Icon name="user" /> Log out</span>
          </Link>
        </Menu>
    );
  }
}
