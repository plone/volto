/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { isMatch } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Menu, Segment } from 'semantic-ui-react';

import { Anontools } from '../../../components';
import { getNavigation } from '../../../actions';
import { BodyClass, getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  closeMobileMenu: {
    id: 'Close menu',
    defaultMessage: 'Close menu',
  },
  openMobileMenu: {
    id: 'Open menu',
    defaultMessage: 'Open menu',
  },
});

@injectIntl
@connect(
  state => ({
    items: state.navigation.items,
  }),
  dispatch => bindActionCreators({ getNavigation }, dispatch),
)
/**
 * Navigation container class.
 * @class Navigation
 * @extends Component
 */
export default class Navigation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getNavigation: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Navigation
   */
  constructor(props) {
    super(props);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.state = {
      isMobileMenuOpen: false,
    };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getNavigation(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getNavigation(getBaseUrl(nextProps.pathname));
    }
  }

  /**
   * Check if menu is active
   * @method isActive
   * @param {string} url Url of the navigation item.
   * @returns {bool} Is menu active?
   */
  isActive(url) {
    return (
      (url === '' && this.props.pathname === '/') ||
      (url !== '' && isMatch(this.props.pathname.split('/'), url.split('/')))
    );
  }

  /**
   * Toggle mobile menu's open state
   * @method toggleMobileMenu
   * @returns {undefined}
   */
  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
  }

  /**
   * Close mobile menu
   * @method closeMobileMenu
   * @returns {undefined}
   */
  closeMobileMenu() {
    if (!this.state.isMobileMenuOpen) {
      return;
    }
    this.setState({ isMobileMenuOpen: false });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Fragment>
        <div className="hamburger-wrapper mobile only">
          <button
            className={
              this.state.isMobileMenuOpen ? 'hamburger active' : 'hamburger'
            }
            title={
              this.state.isMobileMenuOpen
                ? this.props.intl.formatMessage(messages.closeMobileMenu, {
                    type: this.props.type,
                  })
                : this.props.intl.formatMessage(messages.openMobileMenu, {
                    type: this.props.type,
                  })
            }
            type="button"
            onClick={this.toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
        <Menu
          stackable
          pointing
          secondary
          className={
            this.state.isMobileMenuOpen
              ? 'open'
              : 'tablet computer large screen widescreen only'
          }
          onClick={this.closeMobileMenu}
        >
          {this.props.items.map(item => (
            <Link
              to={item.url === '' ? '/' : item.url}
              key={item.url}
              className={this.isActive(item.url) ? 'item active' : 'item'}
            >
              {item.title}
            </Link>
          ))}
        </Menu>
      </Fragment>
    );
  }
}
