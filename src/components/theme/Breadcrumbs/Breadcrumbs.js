/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { getBreadcrumbs } from 'actions';

@connect(
  state => ({
    loaded: state.breadcrumbs.loaded,
    error: state.breadcrumbs.error,
    items: state.breadcrumbs.items,
    location: state.routing.location,
  }),
  dispatch => bindActionCreators({ getBreadcrumbs }, dispatch),
)
/**
 * Breadcrumbs container class.
 * @class Breadcrumbs
 * @extends Component
 */
export default class Breadcrumbs extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getBreadcrumbs: PropTypes.func.isRequired,
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
    this.props.getBreadcrumbs(
      this.props.location.pathname
        .replace('/add', '')
        .replace('/delete', '')
        .replace('/edit', '')
        .replace('/login', '')
        .replace('/logout', '')
    );
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.getBreadcrumbs(
        nextProps.location.pathname
          .replace('/add', '')
          .replace('/delete', '')
          .replace('/edit', '')
          .replace('/login', '')
          .replace('/logout', '')
      );
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <nav id="portal-breadcrumbs" className="plone-breadcrumb" role="navigation">
        <div className="container">
          <span id="breadcrumbs-you-are-here" className="hiddenStructure">You are here:</span>
          <ol aria-labelledby="breadcrumbs-you-are-here">
            <li id="breadcrumbs-home">
              <Link to="/">Home</Link>
            </li>
            {this.props.items.map((item, index, items) =>
              <li key={index} id={`breadcrumbs-${index + 1}`}>
                {(index < items.length - 1) && <Link to={item.url}>{item.title}</Link>}
                {(index === items.length - 1) && <span className="breadcrumbs-current">{item.title}</span>}
              </li>
            )}
          </ol>
        </div>
      </nav>
    );
  }
}
