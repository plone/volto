/**
 * Toolbar component.
 * @module components/manage/Toolbar/Toolbar
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Divider, Menu } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import cookie from 'react-cookie';
import { injectIntl } from 'react-intl';
import { BodyClass } from '../../../helpers';
import LogoImage from './pastanaga.svg';

@injectIntl
@connect(state => ({
  token: state.userSession.token,
  fullname: state.userSession.token
    ? jwtDecode(state.userSession.token).fullname
    : '',
  content: state.content.data,
}))
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
    token: PropTypes.string,
    content: PropTypes.shape({
      '@type': PropTypes.string,
      is_folderish: PropTypes.bool,
      review_state: PropTypes.string,
    }),
    inner: PropTypes.element.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    content: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Toolbar
   */
  constructor(props) {
    super(props);
    this.onToggleExpanded = this.onToggleExpanded.bind(this);
    this.state = {
      expanded: cookie.load('toolbar_expanded') !== 'false',
    };
  }

  /**
   * On toggle expanded handler
   * @method onToggleExpanded
   * @returns {undefined}
   */
  onToggleExpanded() {
    cookie.save('toolbar_expanded', !this.state.expanded, {
      expires: new Date((2 ** 31 - 1) * 1000),
      path: '/',
    });
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { expanded } = this.state;

    return (
      this.props.token && (
        <Fragment>
          <BodyClass className="has-toolbar" />
          <Menu
            vertical
            borderless
            icon
            fixed="left"
            className={!expanded ? 'collapsed' : ''}
          >
            {this.props.inner}
            <Menu.Item className="logo">
              <Divider />
              <div
                className="image"
                style={{ backgroundImage: `url(${LogoImage})` }}
              />
            </Menu.Item>
            <Button
              className={
                this.props.content && this.props.content.review_state
                  ? `${this.props.content.review_state} trigger`
                  : 'trigger'
              }
              onClick={this.onToggleExpanded}
            />
          </Menu>
          <div className={this.state.expanded ? 'pusher expanded' : 'pusher'} />
        </Fragment>
      )
    );
  }
}
