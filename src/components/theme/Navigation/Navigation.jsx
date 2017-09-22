/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Container, Segment, Menu } from 'semantic-ui-react';

import { getNavigation } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

/**
 * Navigation container class.
 * @class Navigation
 * @extends Component
 */
@connect(
  state => ({
    items: state.navigation.items,
  }),
  dispatch => bindActionCreators({ getNavigation }, dispatch),
)
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
  };

  /**
   * Component will mount
   * @method componentWillMount
   * 
   */
  componentWillMount() {
    this.props.getNavigation(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * 
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
      (url !== '' && this.props.pathname.indexOf(url) !== -1)
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Segment inverted color="blue" vertical>
        <Container>
          <Menu secondary inverted stackable>
            {this.props.items.map(item => (
              <Link
                to={item.url === '' ? '/' : item.url}
                key={item.url}
                className={`item${this.isActive(item.url) ? ' active' : ''}`}
              >
                {item.title}
              </Link>
            ))}
          </Menu>
        </Container>
      </Segment>
    );
  }
}
