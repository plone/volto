/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { getBreadcrumbs } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

@connect(
  state => ({
    items: state.breadcrumbs.items,
    pathname: state.routing.locationBeforeTransitions.pathname,
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
    this.props.getBreadcrumbs(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getBreadcrumbs(getBaseUrl(nextProps.pathname));
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
              <li key={item.url} id={`breadcrumbs-${index + 1}`}>
                {(index < items.length - 1) && <Link to={item.url}>{item.title}</Link>}
                {(index === items.length - 1) && <span className="breadcrumbs-current">{item.title}</span>}
              </li>,
            )}
          </ol>
        </div>
      </nav>
    );
  }
}
