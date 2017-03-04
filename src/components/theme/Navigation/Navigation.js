/**
 * Navigation components.
 * @module components/Navigation
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { getNavigation } from 'actions';

@connect(
  state => ({
    loaded: state.navigation.loaded,
    error: state.navigation.error,
    items: state.navigation.items,
    location: state.routing.location,
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
    loaded: PropTypes.bool.isRequired,
    location: PropTypes.object,
    error: PropTypes.object,
    items: PropTypes.array,
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getNavigation(
      this.props.location.pathname
        .replace('/add', '')
        .replace('/edit', '')
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="mainnavigation-wrapper">
        <div id="mainnavigation">
          <nav className="plone-navbar" id="portal-globalnav-wrapper" role="navigation">
            <div className="container">
              <div className="plone-collapse plone-navbar-collapse" id="portal-globalnav-collapse">
                <ul className="plone-nav plone-navbar-nav" id="portal-globalnav">
                  {this.props.items.map(item =>
                    <li key={item.url}
                        id="portaltab-index_html"
                        className={this.props.location.pathname.indexOf(item.url) !== -1 ? 'selected': ''}>
                      <Link to={item.url}>{item.title}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
