/**
 * Toolbar component.
 * @module components/manage/Toolbar/Toolbar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';

import { Actions, Display, Types, Workflow } from '../../../components';

import logo from './plone-toolbarlogo.svg';

/**
 * Toolbar container class.
 * @class Toolbar
 * @extends Component
 */
@connect(state => ({
  token: state.userSession.token,
  fullname: jwtDecode(state.userSession.token).fullname,
}))
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
    fullname: PropTypes.string,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    fullname: '',
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      this.props.token &&
      <Menu inverted vertical fixed="left">
        <Menu.Item color="blue" active>
          <img alt="Plone Toolbar" src={logo} />
        </Menu.Item>
        <Link
          to={`${this.props.pathname}/edit`}
          className={`item${this.props.selected === 'edit' ? ' active' : ''}`}
        >
          <span><Icon name="write" /> Edit</span>
        </Link>
        <Link
          to={this.props.pathname}
          className={`item${this.props.selected === 'view' ? ' active' : ''}`}
        >
          <span><Icon name="eye" /> View</span>
        </Link>
        <Types
          pathname={this.props.pathname}
          active={this.props.selected === 'add'}
        />
        <Workflow pathname={this.props.pathname} />
        <Actions pathname={this.props.pathname} />
        <Display pathname={this.props.pathname} />
        <Link
          to={`${this.props.pathname}/sharing`}
          className={`item${this.props.selected === 'sharing' ? ' active' : ''}`}
        >
          <span><Icon name="users" /> Sharing</span>
        </Link>
        <Dropdown
          className="personal-bar"
          item
          trigger={<span><Icon name="user" /> {this.props.fullname}</span>}
          pointing="left"
        >
          <Dropdown.Menu>
            <Link to="/logout" className="item">
              <span><Icon name="sign out" /> Log out</span>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}
