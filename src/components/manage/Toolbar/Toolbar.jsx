/**
 * Toolbar component.
 * @module components/manage/Toolbar/Toolbar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Divider, Dropdown, Icon, Menu } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import cookie from 'react-cookie';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { Actions, Display, Types, Workflow } from '../../../components';
import LogoImage from './pastanaga.svg';

const messages = defineMessages({
  ploneToolbar: {
    id: 'Plone Toolbar',
    defaultMessage: 'Plone Toolbar',
  },
  contents: {
    id: 'Contents',
    defaultMessage: 'Contents',
  },
  view: {
    id: 'View',
    defaultMessage: 'View',
  },
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
});

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
    pathname: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    token: PropTypes.string,
    fullname: PropTypes.string,
    content: PropTypes.shape({
      '@type': PropTypes.string,
      is_folderish: PropTypes.bool,
      review_state: PropTypes.string,
    }),
    inner: PropTypes.element,
    intl: intlShape.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    fullname: '',
    content: null,
    inner: null,
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
        <Menu
          vertical
          borderless
          icon
          fixed="left"
          className={!expanded ? 'collapsed' : ''}
        >
          {this.props.inner || (
            <div>
              <Link
                to={`${this.props.pathname}/edit`}
                id="toolbar-edit"
                className={`item${
                  this.props.selected === 'edit' ? ' active' : ''
                }`}
              >
                <Icon
                  name="write"
                  size="big"
                  color="blue"
                  title={this.props.intl.formatMessage(messages.edit)}
                />
              </Link>
              {this.props.content &&
                this.props.content.is_folderish && (
                  <Link
                    to={`${this.props.pathname}/contents`.replace(/\/\//g, '/')}
                    id="toolbar-folder-contents"
                    className={`item${
                      this.props.selected === 'contents' ? ' active' : ''
                    }`}
                  >
                    <Icon
                      name="folder open"
                      size="big"
                      title={this.props.intl.formatMessage(messages.contents)}
                    />
                  </Link>
                )}
              {this.props.content &&
                this.props.content.is_folderish && (
                  <Types
                    pathname={this.props.pathname}
                    active={this.props.selected === 'add'}
                  />
                )}

              <Dropdown
                id="toolbar-more"
                item
                trigger={<Icon name="ellipsis horizontal" size="big" />}
              >
                <Dropdown.Menu>
                  <Workflow pathname={this.props.pathname} />
                  <Actions pathname={this.props.pathname} />
                  <Display pathname={this.props.pathname} />
                  <Link
                    to={`${this.props.pathname}/history`}
                    id="toolbar-history"
                    className={`item${
                      this.props.selected === 'history' ? ' active' : ''
                    }`}
                  >
                    <Icon name="clock" size="big" />{' '}
                    <FormattedMessage id="History" defaultMessage="History" />
                  </Link>
                  <Link
                    to={`${this.props.pathname}/sharing`}
                    id="toolbar-sharing"
                    className={`item${
                      this.props.selected === 'sharing' ? ' active' : ''
                    }`}
                  >
                    <Icon name="share" size="big" />{' '}
                    <FormattedMessage id="Sharing" defaultMessage="Sharing" />
                  </Link>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown
                id="toolbar-personal"
                className="personal-bar"
                item
                upward
                trigger={<Icon name="user" size="big" />}
              >
                <Dropdown.Menu>
                  <Link to="/personal-preferences" className="item">
                    <span>
                      <Icon name="setting" />{' '}
                      <FormattedMessage
                        id="Preferences"
                        defaultMessage="Preferences"
                      />
                    </span>
                  </Link>
                  <Link to="/controlpanel" className="item">
                    <span>
                      <Icon name="settings" />{' '}
                      <FormattedMessage
                        id="Site Setup"
                        defaultMessage="Site Setup"
                      />
                    </span>
                  </Link>
                  <Link to="/controlpanel/moderate-comments" className="item">
                    <span>
                      <Icon name="comments" />{' '}
                      <FormattedMessage
                        id="Moderate comments"
                        defaultMessage="Moderate comments"
                      />
                    </span>
                  </Link>
                  <Link to="/logout" id="toolbar-logout" className="item">
                    <span>
                      <Icon name="sign out" />{' '}
                      <FormattedMessage id="Log out" defaultMessage="Log out" />
                    </span>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
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
      )
    );
  }
}
