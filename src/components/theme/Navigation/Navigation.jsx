/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { getNavigation } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

@connect(
  state => ({
    items: state.navigation.items,
    pathname: state.routing.locationBeforeTransitions.pathname,
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
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
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
                    <li
                      key={item.url}
                      id="portaltab-index_html"
                      className={this.props.pathname.indexOf(item.url) !== -1 ? 'selected' : ''}
                    >
                      <Link to={item.url}>{item.title}</Link>
                    </li>,
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
